import cloudinary from "../config/cloudinary.js";
import productModel from "../models/productModel.js";

const createProduct=async(req,res)=>{
try{
    const{name,description,price,category,subCategory,sizes,popular}=req.body;
    const image1=req.files.image1&&req.files.image1[0];
    const image2=req.files.image2&&req.files.image2[0];
    const image3=req.files.image3&&req.files.image3[0];
    const image4=req.files.image4&&req.files.image4[0];

    const images=[image1,image2,image3,image3,image4].filter((item)=>item!==undefined)
    let imagesUrl=await Promise.all(images.map(async(item)=>{
        let result=await cloudinary.uploader.upload(item.path,{resource_type:'image'});
        return result.secure_url
    }))

    const pri = Number(price);
if (isNaN(pri)) {
    return res.json({ success: false, message: "Price must be a valid number." });
}

    const productData={
        name,
        description,
        price:pri,
        category,
        subCategory,
        popular:popular==="true"?true:false,
        sizes:JSON.parse(sizes),
        image:imagesUrl,
        date:Date.now()

    }
    console.log(productData)
   const product=new productModel(productData);
   await product.save();
   res.json({success:true,message:"Product added successfully"})
   
}catch(err){
console.log(err.message)
res.json({success:false,message:err.message})
}
}

const removeProduct=async(req,res)=>{
try {
    await productModel.findByIdAndDelete(req.body.id)
res.json({success:true,message:"Product deleted successfully"});
} catch (error) {
    console.log(error);
    res.json({succes:false,message:error.message})
}
}

const updateProduct=async(req,res)=>{

}

const readProducts=async(req,res)=>{
try {
    const products=await productModel.find({})
    res.json({success:true,products})
} catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
}
}

const singleProduct=async(req,res)=>{
try {
    const {productId}=req.body;
    const product=await productModel.findById(productId);
    res.json({success:true,product});

} catch (error) {
    console.log(error);
    res.send({success:false,message:error.message})
}

}



export{createProduct,readProducts,removeProduct,updateProduct,singleProduct}