import { OnInit, AfterContentChecked, Injector, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BaseResourceModel} from '../../models/base-resource.model'
import { BaseResourceService} from '../../services/base-resource.service'

import { switchMap } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

@Injectable()
export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

currentAction: string;
resourceForm: FormGroup;
pageTitle: string;
serverErrorMessages: string[] = null;
submittingForm = false;

protected route: ActivatedRoute;
protected router: Router;
protected formBuilder: FormBuilder;

  constructor(
    public resource: T,
    protected injector: Injector,
    protected toastr: ToastrService,
    protected baseResourceService: BaseResourceService<T>,
    protected jsonDataResourceFn: (jsonData) => T
    ) { 
        this.route = this.injector.get(ActivatedRoute);
        this.router = this.injector.get(Router);
        this.formBuilder = this.injector.get(FormBuilder);
    }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm(): void {
    this.submittingForm = true;
    
    if (this.currentAction === 'new') {
      this.createResource();
    } else {
      this.updateResource();
    }
  }

  // PRIVATE METHODS

  protected setCurrentAction(): void {
    this.currentAction = this.route.snapshot.url[0].path === 'new' ? 'new' : 'edit';
  }

  protected loadResource(): void {
    if (this.currentAction === 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.baseResourceService.getById(+params.get('id')))
      ).subscribe({
        next: (resource) => {
          this.resource = resource;
          this.resourceForm.patchValue(this.resource);
        },
        error: (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
      })
    }
  }

  protected setPageTitle(): void {
    if (this.currentAction === 'new') {
      this.pageTitle = this.creationPageTitle();
    } else {
      this.pageTitle = this.editionPageTitle();
    }
  }

  protected creationPageTitle(): string {
    return 'Novo'
  }
  protected editionPageTitle(): string {
    return 'Edição'
  }

  protected createResource(): void {
    const resource: T = this.jsonDataResourceFn(this.resourceForm.value);
    this.baseResourceService.create(resource).subscribe({
      next: (resource) => this.actionsForSuccess(resource),
      error: (error) => this.actionsForError(error)
    });
  }

  protected updateResource(): void {
    const resource: T = this.jsonDataResourceFn(this.resourceForm.value);
    this.baseResourceService.update(resource).subscribe({
      next: () => this.actionsForSuccess(resource),
      error: (error) => this.actionsForError(error)
    });
  }

  protected actionsForSuccess(resource: T): void {
    const baseComponentPath = this.route.snapshot.parent.url[0].path;
    this.toastr.success('Solicitação processada com sucesso!');
    this.router.navigateByUrl(baseComponentPath, { skipLocationChange: true }).then(
      () => this.router.navigate([baseComponentPath, resource?.id, 'edit'])
    );
  }

  protected actionsForError(error): void {
    this.toastr.error('Ocorreu um erro ao processar a sua solicitação!');
    this.submittingForm = false;
    if (error.status === 422) {
      this.serverErrorMessages =  JSON.parse(error._body).erros;
    } else {
      this.serverErrorMessages = ['Falha na comunicação com o servidor. Por favor, tente mais tarde.'];
    }
  }

  protected abstract buildResourceForm(): void;

}
