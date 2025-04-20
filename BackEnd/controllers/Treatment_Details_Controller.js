import Employee from "../models/Employee.js";
import Patient from "../models/Patient.js";
import Treatment_Details from "../models/Treatment_Details.js";
import Treatments from "../models/Treatments.js";

const Treatment_Details_Controller = {
	// Get all treatment details
	async getAllTreatments(req, res) {
		try {
			const treatments = await Treatment_Details.findAll();
			res.status(200).json(treatments);
		} catch (error) {
			res.status(500).json({ error: "Failed to fetch treatments", details: error.message });
		}
	},

	// Get treatment details by ID
	async getTreatmentByPatientId(req, res) {
		const patient_ID = req.params.id;
		console.log(patient_ID);
		try {
			const treatments = await Treatments.findAll({
				where: {
					Patient_ID: patient_ID,
				},
			});
			if (!treatments || treatments.length === 0) {
				return res.status(404).json({ message: "No treatments found for this patient." });
			}
			const treatmentData = await Promise.all(
				treatments.map(async (treatment) => {
					const info = await Treatment_Details.findOne({
						where: {
							Treatment_ID: treatment.Treatment_ID,
						},
					});

          const doctorName = await Employee.findOne({
            where:{
              Employee_ID: treatment.Employee_ID,
            },
            attributes: ['First_Name', 'Last_Name']
          });

					return {
						...treatment.dataValues,
						Treatment_Details: info,
            Doctor_Name: `${doctorName.First_Name} ${doctorName.Last_Name}`,
					};
				})
			);
			res.status(200).json(treatmentData);
		} catch (error) {
			res.status(500).json({
				error: "Failed to fetch treatments",
				details: error.message,
			});
		}
	},

  async getTreatmentByDoctorId(req, res) {
    const doctor_ID = req.params.id;
    console.log(doctor_ID);
  
    try {
      const treatments = await Treatments.findAll({
        where: {
          Employee_ID: doctor_ID,
        },
      });
  
      if (!treatments || treatments.length === 0) {
        return res.status(404).json({ message: "No treatments found for this doctor." });
      }
  
      const treatmentData = await Promise.all(
        treatments.map(async (treatment) => {
          const info = await Treatment_Details.findOne({
            where: {
              Treatment_ID: treatment.Treatment_ID,
            },
          });
  
          const patient = await Patient.findOne({
            where: {
              Patient_ID: treatment.Patient_ID,
            },
          });
  
          return {
            ...treatment.dataValues,
            Treatment_Details: info,
            Patient_Details:patient,
          };
        })
      );
  
      res.status(200).json(treatmentData);
    } catch (error) {
      res.status(500).json({
        error: "Failed to fetch treatments",
        details: error.message,
      });
    }
  },  

	// Add a new treatment
	async addTreatment(req, res) {
		const { Name, Description, Diagnosis } = req.body;

		try {
			const newTreatment = await Treatment_Details.create({
				Name,
				Description,
				Diagnosis,
			});

			res.status(201).json(newTreatment);
		} catch (error) {
			res.status(500).json({ error: "Failed to add treatment", details: error.message });
		}
	},

	async updateTreatment(req, res) {
		const { Treatment_ID } = req.params;
		const { Name, Description, Diagnosis } = req.body;
		try {
			const treatment = await Treatment_Details.findByPk(Treatment_ID);
			if (!treatment) {
				return res.status(404).json({ message: "Treatment not found" });
			}
			await treatment.update({ Name, Description, Diagnosis });
			res.status(200).json(treatment);
		} catch (error) {
			res.status(500).json({ error: "Failed to update treatment", details: error.message });
		}
	},

	async deleteTreatment(req, res) {
		const { Treatment_ID } = req.params;
		try {
			const treatment = await Treatment_Details.findByPk(Treatment_ID);
			if (!treatment) {
				return res.status(404).json({ message: "Treatment not found" });
			}
			await treatment.destroy();
			res.status(200).json({ message: "Treatment deleted successfully" });
		} catch (error) {
			res.status(500).json({ error: "Failed to delete treatment", details: error.message });
		}
	},
};

export default Treatment_Details_Controller;
