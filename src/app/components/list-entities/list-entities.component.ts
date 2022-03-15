import { Component, OnInit } from '@angular/core';
import { Entity } from 'src/app/models/entity.model';
import { EntityService } from 'src/app/services/entity.service';

// helpers
import { GetItemLocalStg, SaveItemInlocalStg ,RemoveItemStg} from 'src/app/helpers/localStorage';



@Component({
  selector: 'app-list-entities',
  templateUrl: './list-entities.component.html',
  styleUrls: ['./list-entities.component.sass']
})
export class ListEntitiesComponent implements OnInit {

  selected: boolean = false
  error: boolean = false
  showErrorMsg:boolean =  false


  entities: Entity[] = [];
  entitiesSelected: Entity[] = [];
  noSelectedEntities: Entity[] = []

  // helpers
  SaveItemInlocalStg = SaveItemInlocalStg;
  ExistItemInLocalStg = GetItemLocalStg;
  RemoveItemStg = RemoveItemStg;

  constructor(private entityServ: EntityService) { }


  ngOnInit(): void {
    this.verifyLocalStg()
    this.verifyError()
  }

  /**
   * verifiy if exist entities and selected in Local storage
   */

  verifyLocalStg(){
    const entitiesLocalStg = GetItemLocalStg('entities')
    const selectedLocalStg = GetItemLocalStg('selected')

    if (!entitiesLocalStg) {
      this.getEntities()

    } else {
      this.entities = entitiesLocalStg
    } 

    if (selectedLocalStg){
      
      this.entitiesSelected = selectedLocalStg  
    } 

  }

  
  /**
   * Remaing all entities
   */

  async getEntities() {
    const ids = [1,2,3,4,5,6,7,8,9,10]

    ids.forEach( async i => {
      const entity = await this.getEntityById(i)
      this.entities.push(entity)

    })
  }

  /**
   * 
   * @param id id_entiy
   * @returns Object type Entity
   */
  getEntityById(id: number):Promise<Entity>{

    return new Promise( (resolve, reject) => {
      this.entityServ.getEntityById(id).subscribe( entitiy => {
        resolve(entitiy)  
      }, err => {
        console.error(err)
        reject(err)
      })
    })
  }

  /**
   * toogle select card
   * @param e type Entity
   */
  onSelectCard(e: Entity){
    e.selected = !e.selected
  }


  /**
   * Dispatch when user has select any itme
   */
  finishSelected(){
    this.entitiesSelected = this.entities.filter(e => e.selected)
    this.noSelectedEntities = this.entities.filter(e => !e.selected)

    this.error  = this.entitiesSelected.length === 0
    if (!this.error) {
      this.goBackDocument()
      this.saveInLocalStg()
    } else {
      RemoveItemStg('selected')
    }
  }
  
  
  saveInLocalStg(){
    SaveItemInlocalStg('selected', this.entitiesSelected)
    SaveItemInlocalStg('entities', this.entities)
  }


  /**
     * Scroll Automatically to the Bottom of the Page
     */
  goBackDocument(){
    setTimeout(() => {
      window.scrollTo(0,document.body.scrollHeight);
    }, 200);

  }

  onChange($event:any){
    this.ngOnInit()
  }
  
  verifyError(){
    setTimeout(()=>{      
      if (this.entities.length === 0){
        this.showErrorMsg = true;
      } else {
        this.showErrorMsg = false

      }
  }, 2000);
  }
}
