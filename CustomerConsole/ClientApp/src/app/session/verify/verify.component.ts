import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  message:string = "";
  showLoader:Boolean = true;
  step = 0;
  constructor(private route: ActivatedRoute,private router:Router,private auth:AuthService) {
    this.route.queryParams.subscribe(params => {
        var id = params['id'];
        if(id){
            this.message = "Verifying...";
            this.auth.VerifyAccount(id).then((data)=>{
              this.showLoader = false;
              if(data){
                this.step = 3;
                this.message = "Email address verified. Please login. Redirecting in 5sec...";
                setTimeout(() => { window.location.href = '/session/login';   }, 5000);
              }
              else{
                this.step = -1;
                this.message = "Invalid verification url or account already activated.";
              }
            },(e)=>{
                console.log(e);
            });
        }
        else{
          window.location.href = '/session/login'; 
        }
    });
  }

  ngOnInit(): void {
  }


}
