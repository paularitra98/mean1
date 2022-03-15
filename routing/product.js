const express=require('express');
const router=express.Router();
const product=require('../model/productmodel');
const fs=require("fs");

router.post('/ins',async (req,res)=>{


    var img=req.files.pimg;
	var fn=Math.floor(Math.random() * 100000)+img.name;
	img.mv("./public/product_img/"+fn,
		async (err)=>{
			if(err){
				throw err;
			}
			else{



				var insobj={
                    uname:req.body.name,
                            uemail:req.body.email,
                            gender:req.body.gender,
                            stream:req.body.stream,
                            subject:req.body.subject,
                            pimg:fn


				}
                await product.create(insobj);

			
			}
		});


   var obj={
	msg:"form submitted"
};
	res.json(obj);


});

router.get('/sel',async (req,res)=>{

    var result=await product.find();
	res.json(result);


});


router.post('/del',async (req,res)=>{
		// console.log(req.body.id);


		var  old=await product.findById(req.body.id);
			fs.unlinkSync("./public/product_img/"+old.pimg);


     await product.findByIdAndDelete(req.body.id);  
	res.json({msg:"deleted"});
});



router.post('/editpro',async (req,res)=>{
	
	var result=await product.findById(req.body.id);
	res.json(result);

});


router.post('/updt',async (req,res)=>{
	
	
if(req.files!=null){
    var img=req.files.pimg;
	var fn=Math.floor(Math.random() * 100000)+img.name;
	img.mv("./public/product_img/"+fn,
		async (err)=>{
			if(err){
				throw err;
			}
			else{

			var  old=await product.findById(req.body.id);
			fs.unlinkSync("./public/product_img/"+old.pimg);



				var insobj={
                    uname:req.body.name,
                            uemail:req.body.email,
                            gender:req.body.gender,
                            stream:req.body.stream,
                            subject:req.body.subject,
                            pimg:fn


				}
                await product.findByIdAndUpdate(req.body.id,insobj);

			
			}
		});
	}else{
		var insobj={
			uname:req.body.name,
					uemail:req.body.email,
					gender:req.body.gender,
					stream:req.body.stream,
					subject:req.body.subject
					


		}
		await product.findByIdAndUpdate(req.body.id,insobj);
	}

   var obj={
	msg:"form submitted"
};
	res.json(obj);



});


module.exports=router;