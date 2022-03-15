import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Entity } from 'src/app/models/entity.model';

// libs
import { ToastrService } from 'ngx-toastr';
import { SaveItemInlocalStg } from 'src/app/helpers/localStorage';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-detail-entities',
  templateUrl: './detail-entities.component.html',
  styleUrls: ['./detail-entities.component.sass']
})
export class DetailEntitiesComponent {

  @Input() entitiesSelected: Entity[] = []
  @Input() noSelectedEntities: Entity[] = []
  @Output() emitEvent = new EventEmitter<boolean>();

  // helpers
  SaveItemInlocalStg = SaveItemInlocalStg;

  constructor(private toastr: ToastrService) { }  
  
  /**
   * Save changes local
   */
  saveChanges(message:string){
    SaveItemInlocalStg('selected', this.entitiesSelected)
    this.toastr.success(message, '');
  }


  /**
   * Remove selected item in local storage
   * @param entityId 
   */
  removeItemLocalStg(id:string){
    Swal.fire({
      title: 'Do you sure delete this?',
      showDenyButton: true,
      confirmButtonText: 'Yes, confirm',
      denyButtonText: `Don't, cancel`,
    }).then((result) => {

      if (result.isConfirmed) {
        const index = this.entitiesSelected.findIndex( e => e.entityId === id)
        this.entitiesSelected.splice(index, 1)
        this.saveChanges('Successfully deleted')
      }

    })

    

  }

}
