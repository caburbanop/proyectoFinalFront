import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { UserService } from '../../services/user.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { global } from '../../services/global';
import { Router, ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-cargar',
  templateUrl: './cargar.component.html',
  styleUrls: ['./cargar.component.css'],
  providers: [UserService]
})
export class CargarComponent {
  hasBaseDropZoneOver:boolean;
  hasAnotherDropZoneOver:boolean;
  response:string;
 
  public archivos = [];   
  public title:string;
    
  public uploader: FileUploader = new FileUploader({
      url: global.url+'upload',
      disableMultipart : false,
      autoUpload: true,
      method: 'post',
      allowedFileType: ['video'],
      itemAlias: 'adjuntos'
  });

  constructor(private _router: Router, private http: HttpClient, private _user: UserService) { 
    this.title = " Reconocimiento de emociones";
  }

  ngOnInit() {
    debugger;
    this.uploader.onAfterAddingFile = (file) => {
        file.withCredentials = false; 
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        var res = JSON.parse(response);
        if(res['estado']=='Exito'){
          debugger;
          if (this.uploader.queue.length > 1) {
            this.uploader.queue.splice(0, 1);
            this.archivos.splice(0, 1);
          }
          this.archivos.push(res['nombre']);
        }
    };
    
    this.uploader.onBuildItemForm = (item, form) => {
        console.log("onBuildItemForm");
    };
  }

  public reconocimiento(tipo){
    debugger;
    var arrDatos = {};
    if ((this.archivos.length == this.uploader.queue.length) && (this.archivos.length > 0)){
      arrDatos['video'] = this.archivos;
      arrDatos['tipo'] = tipo;
      this._user.post('default', arrDatos).subscribe(
        res => {  
          debugger;          
          if(res['estado']=='Exito'){
            if (res['proceso'] != "") {
              this._router.navigate(["/grafica/"+res['proceso']+"/"+res['tipo']]);
              alert(res['mensaje']+res['proceso']);
            } else {
              alert('Error al generar el proceso');
            }
          }
        }
      ); 
    } else {
      alert('No se ha subido ningún archivo');
    }
  }

  public eliminar(item) {
    debugger;
    item.remove();
    this.archivos.splice(0, 1);
  }
}
