import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { contacts, tags, Users } from './app.entity';
import { v4 as uid } from 'uuid';
import { of, throwError } from 'rxjs';
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Users)
    private usersRepo:Repository<Users>,
    @InjectRepository(contacts)
    private contactRepo:Repository<contacts>,
    @InjectRepository(tags)
    private tagsRepo:Repository<tags>){}
    
    postdata(signupdata): any {
      try{
        let user = `u_${uid()}`;
    this.usersRepo.insert({userid:user,tags:['t_b37978a0-5afe-408e-80c6-855d01b941cd','t_87e34794-d0e9-4516-811b-6608d34a547e','t_40089761-8ced-4dff-a7ec-a90ccdbe0fd9','t_05577e51-9429-48c1-8092-690734d3bc2a'],...signupdata})
      return {
        'Status':'Success',
        'Message':'Account created Successfully',
        'userid':user
      }
      }
      catch(err){
        console.log(err)
        return err
      }
  }
    logindata(login_data):any{
       try {
        let user1 =this.usersRepo.query(`select username from users where userid=${login_data.userid};`)
       let pass=this.usersRepo.query(`select password from users where userid=${login_data.userid};`)
      // let user1=this.usersRepo.find(login_data.userid)
      if(login_data.username == user1 && login_data.password==pass){
        return{
          "status":"success",
          "message":"Logged in Successfully "
        }
      }
       } catch (err) {
        console.log(err);
        return err
       }
    }
    async addcontact(contact){
      try {
        let contactid = `c_${uid()}`;
        let userid=contact.userid;
        delete contact.userid;

        await this.contactRepo.insert({contactid:contactid,...contact}).then(()=>{
          this.usersRepo.findOne({where:{userid:userid}}).then( (par)=>{
           let contactarray=par.contacts
          if(contactarray==null){
            contactarray=[]
            contactarray.push(contactid)
          }
          else{
            contactarray.push(contactid)
          }
          this.usersRepo.update(userid,{contacts:contactarray})
          }).catch((err)=>{
            throw err;
          });
          
        }).catch(async (err)=>{
          throw err
        }) 
        let tags=contact.tags
        let usertag= await this.usersRepo.findOne({where:{userid:userid}})
        var usertagids = usertag.tags
        tags.forEach(async (tag) => {
          let tagidfromtags=await this.tagsRepo.findOne({where:{tagname:tag}})
           console.log(tagidfromtags);//null
            if(tagidfromtags==null){
              let tagid = `t_${uid()}`
              await this.tagsRepo.insert({tagid:tagid,tagname:tag})
              usertagids.push(tagid)
            }
            else if(!(usertag.tags.includes(tagidfromtags.tagid))){ 
              usertagids.push(tagidfromtags.tagid)
              console.log('added') ;
              console.log(usertagids);
            }

            })
            console.log(usertagids);
            this.usersRepo.update(userid,{tags:usertagids}).catch((err)=>{throw err})
            
          
        return {
          'Status':'Success',
          'Message':'contact saved',
          'data':{userid,contactid},
        }
      } catch (err) {
        console.log(err);
        return  {
          'Status':'failed',
          'Message':'contact not saved'
        }
      }
    }
    async allcontact(allcontact){
      try {
        let user=allcontact.userid
        let contacts=[]
            let contactidsfromuser = await this.usersRepo.findOne({where:{userid:user},select:['contacts']})
            console.log("contact ids",contactidsfromuser);
            for (let contactid of contactidsfromuser.contacts) {
              contacts.push(await this.contactRepo.findOne({where:{contactid:contactid}}))
            }
          return{ 
              'Status':'Success',
              'Message':'fetched all contacts successfully',
              'data':contacts
            }
      } catch (err) {
        console.log(err);
        return err
      }
    }
    async contactbyid(contactbyid){
      try {
        let contactid=contactbyid.contactid
        let contact=[]
        contact.push(await this.contactRepo.findOne({where:{contactid:contactid}}))
        return{
          'Status':'Success',
          'Message':'fetched  contact successfully',
          'data': contact
        }
      } catch (error) {
        console.log(error);
        return error
      }
    }
    
 }
