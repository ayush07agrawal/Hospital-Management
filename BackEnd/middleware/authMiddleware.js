import jwt from "jsonwebtoken";
import Patient from "../models/Patient.js";
import Employee from "../models/Employee.js";

const verifyToken = async (req, res, next) => {
	const token = req.cookies.token;
	next();
	return;
	
	if (!token) {
		return res.status(401).json({ message: "No token provided" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const { Role, First_Name, Email_ID } = decoded;
    
		let user;
    
    console.log('Role');
		if (Role.toLowerCase() === "patient") {
			user = await Patient.findOne({ where: { Email_ID:Email_ID, First_Name:First_Name }});
		} 
    else {
			user = await Employee.findOne({ where: { Email_ID:Email_ID, First_Name:First_Name }});
		}

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		req.user = {...user, role:Role.toLowerCase()};
		next();
	}
  catch (err) {
		console.error("Auth error:", err);
		return res.status(403).json({ message: "Invalid or expired token" });
	}
};

export default verifyToken;
