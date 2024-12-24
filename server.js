const express= require("express")
const mysql=require("mysql2")

const app=express()

const db=mysql.createConnection({
    host:"nodejs-technical-test.cm30rlobuoic.ap-southeast-1.rds.amazonaws.com",
    user: "candidate",
    password:"NoTeDeSt^C10.6?SxwY882}",
    database: "conqtvms_dev"
})



db.connect((err)=>{
    if(err){
        console.log(err)
  }
  else{
    console.log("connected successfully to database")}
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
 SELECT vu.VendorOrganizationId As supplierId ,
                                           vu.Username,
                                           vu.Name  
                                       FROM
                                           prLineItems pli
                                       JOIN 
                                       vendorUsers vu
                                       ON
 Find_IN_SET(vu.VendorOrganizationId,pli.suppliers) >0
 WHERE
  pli.purchaseRequestId=?
             AND pli.custOrgId=?
            AND vu.Role='Admin'; `;
        const [results ]=await db.promise().query(query,[prId,custOrgId]);
        




    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({
            error :"internal server error"
        })
    }
})

app.listen('3000',()=>{
    console.log("app is listening at port 3000")
})