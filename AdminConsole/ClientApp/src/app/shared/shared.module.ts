import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MenuToggleModule } from './menu/menu-toggle.module';
import { TableComponent } from './table/table.component';
import {MatTableModule} from '@angular/material/table';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { InputComponent } from './input/input.component';
import { SelectComponent } from './select/select.component';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { NgbButtonsModule } from '@ng-bootstrap/ng-bootstrap';
import { TextareaComponent } from './textarea/textarea.component';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EditorComponent } from './editor/editor.component';
import { TreeviewComponent } from './treeview/treeview.component';
import { MatTreeModule } from '@angular/material/tree';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
//import { QuillModule } from 'ngx-quill'


@NgModule({
  declarations: [
    TableComponent,
    SidenavComponent,
    NavbarComponent,
    InputComponent,
    SelectComponent,
    TextareaComponent,
    EditorComponent,
    TreeviewComponent,
    ConfirmationComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    MenuToggleModule,
    MatTableModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    FormsModule,
    MatSelectModule,
    MatPaginatorModule,
    MatInputModule,
    NgbButtonsModule,
    FlexLayoutModule,
    MatMenuModule,
    MatTreeModule,
    MatButtonModule,
    MatDialogModule
    //QuillModule
  ],
  exports:[
    SidenavComponent,
    TableComponent,
    InputComponent,
    SelectComponent,
    TextareaComponent,
    NavbarComponent,
    EditorComponent,
    TreeviewComponent,
    ConfirmationComponent
  ],
  providers: [
    DatePipe
  ]
})
export class SharedModule { }
