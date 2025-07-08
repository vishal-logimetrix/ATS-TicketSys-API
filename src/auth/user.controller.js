


export const Login = (req, res)=>{
    try {
        res.json("Login working")
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}