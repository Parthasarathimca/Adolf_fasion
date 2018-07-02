from django.http.response import HttpResponse
from Product_Details.models import ProductCategory
from django.conf import settings as media_path
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.views.decorators.csrf import csrf_exempt
from adolf_home.models import ImageAttachment
from django.db import connection
import json
import base64,os


#File storage function
def file_datainsert(*args): 
    # from CommonLib.hcms_common import file_datainsert
    # file_datainsert(['file_datas', '1'], [{'file_name': 'sample.png', 'file_binary': 'binary string'}])
    #try: 
        
        file_location = ''     
        for data in args[0]: 
            
            file_location = file_location + str(data) 
            if not os.path.isdir(media_path.MEDIA_ROOT + str(file_location) +'/'):
                print"mkdirrrrrrrrrrrrrrrrr",media_path.MEDIA_ROOT+str(file_location) +'/'
                os.mkdir(media_path.MEDIA_ROOT+str(file_location) +'/')
            file_location = file_location + '/'
            
        for data in args[1]: 
            file_name = data['file_name'] 
            file_binary = data['file_binary'] 
            file_find_remove = media_path.MEDIA_ROOT+file_location+file_name
            print "#####===>>>> file_find_remove==>>",file_find_remove
            if os.path.isfile(file_find_remove):
                os.remove(file_find_remove)  
            else:    ## Show an error ##
                print "Error: %s file not found" % file_find_remove
            upload_file = default_storage.save(''.join(str(file_location) + str(file_name)), ContentFile(base64.b64decode(file_binary)))
        
        return media_path.MEDIA_ROOT+file_location
    #except Exception as e:
     #   print 'File insert error ---->',e
     #   return False


def static_image(id,img_str,format,img_name,cur,status,folder_name,uid):
    #try:    
            image_name = str(str(id)+'.'+str(format)) 
            if img_str: 
                file_location = file_datainsert([folder_name], [{'file_name': image_name, 'file_binary': img_str}])
                file_location = file_location+image_name
                if file_location:
                        cr = connection.cursor()
                        if status == 'insert':
                            print "--------@@@@@@@@@@@-------------------",ImageAttachment._meta.fields
                            try:

                                status = ImageAttachment(name=str(image_name),
                                path=str(file_location),
                                format=str(format),
                                is_active=True)
                                status.save() 
                                insert_res=status.id   
                            except Exception as e:
                                print "-error-------@@@@@@@@@@@-------------------",e

                            #cr.execute(querys,(str(image_name),str(file_location),str(format),))
                            #insert_res =cr.execute("SELECT LAST_INSERT_ID();")
                            print "====Image Insert REturning ID========>",insert_res
                            connection.commit()  
                            return insert_res  
                        elif status == 'update': 
                        #querys =  q.fetch_hcms_query(config.employee_management, config.hrms_attachment_update)  
                            status = ImageAttachment.objects.filter(id=int(id)).update(name=str(image_name),
                            path=str(file_location),
                            format=str(format),
                            is_active=True,modified_by_id=int(uid))
                            update_res=status
                            print "====Image Update REturning ID========>",update_res
                            connection.commit()
                            return update_res   
    #except Exception as e:
    #    print "errror in static_image",e
    #    return 0
@csrf_exempt
def img_crud(request):
    json_data = {}
    try:
            cur = connection.cursor()  #create the database connection
            post = request.POST
            print "######3",post
            img_format = post.get("img_format")  
            img_name = post.get("img_name")  
            img_str = post.get("img_str")  
            attachment_id = post.get("attachment_id")  
            querys ="select coalesce (max(id+1),1) as id from attachment_info"
            if not attachment_id:
                
                if querys and img_format and img_name and img_str:
                    cur.execute(querys)  
                    values = dictfetchall(cur) 
                    print "------------Insert-------------------",values
                    if values:
                        print "------------Insert-------------------",attachment_id
                        status = static_image(values[0]['id'],img_str,img_format,img_name,cur,'insert','product_image',request.user.id)
                        
                        json_data["id"] = status
                else:
                    json_data["id"] = []
            else:
                print "------------Update-------------------",attachment_id
                status = static_image(attachment_id,img_str,img_format,img_name,cur,'update','product_image',request.user.id)
                json_data["id"] = status
    except Exception as e:
            print "====================Org Logo --------------------",e
            json_data["id"] = 0  
    return HttpResponse(json.dumps(json_data))
  
#Returns all rows from a cursor as a dictionary
def dictfetchall(cursor):
    "Returns all rows from a cursor as a dictionary."
    """
            Returns all rows from a cursor as a dictionary
            @param cursor:cursor object
            @return: dictionary contains the details fetch from the cursor object
            @rtype: dictionary
    """
    desc = cursor.description
    return [
        dict(zip([col[0] for col in desc], row))
        for row in cursor.fetchall()
    ]