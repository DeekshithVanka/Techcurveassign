const express= require("express")
const mysql=require("mysql2")

const app=express()

const db=mysql.createConnection({
    host:'nodejs-technical-test.cm30rlobuoic.ap-southeast-1.rds.amazonaws.com',
    user: 'candidate',
    password:' NoTeDeSt^C10.6?SxwY882}' ,
    database: 'conqtvms'
})
db.connect((err)=>{
    if(err){
        console.log(err)

    }
    console.log("connected successfully to database")
})



app.get('/api/getVendorUsers',async( req,res)=>{
    const prId=req.query.prId;
    const custOrgId=req.query.custOrgId;
    console.log(req.query.prId)
    console.log(req.query)
    if (!prId|| !custOrgId){
        return res.status(400).json({
            error: "missing query params"
        })
    }

    try{
        const query=`
 select vu.VendorOrganizationId As supplierId ,vu.Username,vu.Name  from prLineItems pli
 Join vendorUsers vu
 ON
 Find_IN_SET(vu.VendorOrganizationId,pli.suppliers)>0
 where
  pli.purchaseRequestId=?
  AND pli.custOrdId=?
  AND vu.Role='Admin'
        
        
        
        `;
        const [results ]=await db.promise().query(query,prId,custOrgId);
        




    }
    catch(err)
    {
        console.log(error)
        res.status(500).json({
            error :"internal server error"
        })
    }
})

app.listen('3000',()=>{
    console.log("app is listening at port 4000")
})