import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';


@Controller("contact")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("signup")
  postdata(@Body() signupdata): any {
    return this.appService.postdata(signupdata);
  }
  @Post("login")
  logindata(@Body() login_data):any{
    return this.appService.logindata(login_data);
  } 
  @Post("addContactofUser")
  addcontact(@Body() contact):any{
    return this.appService.addcontact(contact);
  }
  @Get("getAllContact")
  allcontact(@Body() allcontact):any{
    return this.appService.allcontact(allcontact);
  }
  @Get("contactbyid")
  contactbyid(@Body() contactbyid):any{
    return this.appService.contactbyid(contactbyid)
  }
  
}
