import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfPipe } from './pdf/pdf.pipe';
import { ImagePipe } from './image/image.pipe';



@NgModule({
  declarations: [ PdfPipe, ImagePipe ],
  exports: [ PdfPipe, ImagePipe ],
})
export class PipesModule { }
