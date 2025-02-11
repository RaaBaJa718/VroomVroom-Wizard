import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";

class Cli {
  vehicles: (Car | Truck | Motorbike)[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  constructor(vehicles: (Car | Truck | Motorbike)[]) {
    this.vehicles = vehicles;
  }

  static generateVin(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedVehicleVin',
          message: 'Select a vehicle to perform an action on',
          choices: this.vehicles.map((vehicle: Car | Truck | Motorbike) => {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle.vin,
            };
          }),
        },
        {
          type: 'input',
          name: 'frontWheelDiameter',
          message: 'Enter Front Wheel Diameter',
        },
        {
          type: 'input',
          name: 'frontWheelBrand',
          message: 'Enter Front Wheel Brand',
        },
        {
          type: 'input',
          name: 'rearWheelDiameter',
          message: 'Enter Rear Wheel Diameter',
        },
        {
          type: 'input',
          name: 'rearWheelBrand',
          message: 'Enter Rear Wheel Brand',
        },
      ])
      .then((answers: { selectedVehicleVin: string }) => {
        this.selectedVehicleVin = answers.selectedVehicleVin;
        this.performActions();
      });
  }

  createVehicle(): void {
    inquirer.prompt<{ vehicleType: string }>([
      {
        type: 'list',
        name: 'vehicleType',
        message: 'Select a vehicle type',
        choices: ['Car', 'Truck', 'Motorbike'],
      },
    ])
    .then((answers) => {
      if (answers.vehicleType === 'Car') {
        this.createCar();
      } else if (answers.vehicleType === 'Truck') {
        this.createTruck();
      } else if (answers.vehicleType === 'Motorbike') {
        this.createMotorbike();
      }
    });
  }


  createCar(): void {
    inquirer.prompt([
      {
        type: 'input',
        name: 'color',
        message: 'Enter Color',
      },
      {
        type: 'input',
        name: 'make',
        message: 'Enter Make',
      },
      {
        type: 'input',
        name: 'model',
        message: 'Enter Model',
      },
      {
        type: 'input',
        name: 'year',
        message: 'Enter Year',
      },
      {
        type: 'input',
        name: 'weight',
        message: 'Enter Weight',
      },
      {
        type: 'input',
        name: 'topSpeed',
        message: 'Enter Top Speed',
      },
    ])
    .then((answers) => {
      const car = new Car(
        Cli.generateVin(),
        answers.color,
        answers.make,
        answers.model,
        parseInt(answers.year),
        parseInt(answers.weight),
        parseInt(answers.topSpeed),
        []
      );
      this.vehicles.push(car);
      this.selectedVehicleVin = car.vin;
      this.performActions();
    });
  }

  createTruck(): void {
    inquirer.prompt([
      {
        type: 'input',
        name: 'color',
        message: 'Enter Color',
      },
      {
        type: 'input',
        name: 'make',
        message: 'Enter Make',
      },
      {
        type: 'input',
        name: 'model',
        message: 'Enter Model',
      },
      {
        type: 'input',
        name: 'year',
        message: 'Enter Year',
      },
      {
        type: 'input',
        name: 'weight',
        message: 'Enter Weight',
      },
      {
        type: 'input',
        name: 'topSpeed',
        message: 'Enter Top Speed',
      },
      {
        type: 'input',
        name: 'towingCapacity',
        message: 'Enter Towing Capacity',
      },
    ])
    .then((answers) => {
      const truck = new Truck(
        Cli.generateVin(),
        answers.color,
        answers.make,
        answers.model,
        parseInt(answers.year),
        parseInt(answers.weight),
        parseInt(answers.topSpeed),
        parseInt(answers.towingCapacity)
      );
      this.vehicles.push(truck);
      this.selectedVehicleVin = truck.vin;
      this.performActions();
    });
  }

  createMotorbike(): void {
    inquirer.prompt([
      {
        type: 'input',
        name: 'color',
        message: 'Enter Color',
      },
      {
        type: 'input',
        name: 'make',
        message: 'Enter Make',
      },
      {
        type: 'input',
        name: 'model',
        message: 'Enter Model',
      },
      {
        type: 'input',
        name: 'year',
        message: 'Enter Year',
      },
      {
        type: 'input',
        name: 'weight',
        message: 'Enter Weight',
      },
      {
        type: 'input',
        name: 'topSpeed',
        message: 'Enter Top Speed',
      },
      {
        type: 'input',
        name: 'frontWheelDiameter',
        message: 'Enter Front Wheel Diameter',
      },
      {
        type: 'input',
        name: 'frontWheelBrand',
        message: 'Enter Front Wheel Brand',
      },
      {
        type: 'input',
        name: 'rearWheelDiameter',
        message: 'Enter Rear Wheel Diameter',
      },
      {
        type: 'input',
        name: 'rearWheelBrand',
        message: 'Enter Rear Wheel Brand',
      },
    ])
    .then((answers) => {
      const motorbike = new Motorbike(
        Cli.generateVin(),
        answers.color,
        answers.make,
        answers.model,
        parseInt(answers.year),
        parseInt(answers.weight),
        parseInt(answers.topSpeed),
        new Wheel(parseInt(answers.frontWheelDiameter), answers.frontWheelBrand),
        new Wheel(parseInt(answers.rearWheelDiameter), answers.rearWheelBrand)
      );
      this.vehicles.push(motorbike);
      this.selectedVehicleVin = motorbike.vin;
      this.performActions();
    });
  }
  

  performActions(): void {
    inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Select an action',
        choices: [
          'Print details',
          'Start vehicle',
          'Accelerate 5 MPH',
          'Decelerate 5 MPH',
          'Stop vehicle',
          'Turn right',
          'Turn left',
          'Reverse',
          'Select or create another vehicle',
          'Exit',
          'Tow',
          'Wheelie',
        ],
      },
    ])
    .then((answers) => {
      if (answers.action === 'Tow') {
        for (let i = 0; i < this.vehicles.length; i++) {
          if (this.selectedVehicleVin && this.vehicles[i].vin === this.selectedVehicleVin && this.vehicles[i] instanceof Truck) {
            this.findVehicleToTow();
            return;
          }
        }
      } else if (answers.action === 'Wheelie') {
        for (let i = 0; i < this.vehicles.length; i++) {
          if (this.selectedVehicleVin && this.vehicles[i].vin === this.selectedVehicleVin && this.vehicles[i] instanceof Motorbike) {
            (this.vehicles[i] as Motorbike).wheelie();
          }
        }
      } else if (answers.action === 'Print details') {
        for (let i = 0; i < this.vehicles.length; i++) {
          if (this.selectedVehicleVin && this.vehicles[i].vin === this.selectedVehicleVin) {
            this.vehicles[i].printDetails();
          }
        }
      } else if (answers.action === 'Start vehicle') {
        for (let i = 0; i < this.vehicles.length; i++) {
          if (this.selectedVehicleVin && this.vehicles[i].vin === this.selectedVehicleVin) {
            this.vehicles[i].start();
          }
        }
      } else if (answers.action === 'Accelerate 5 MPH') {
        for (let i = 0; i < this.vehicles.length; i++) {
          if (this.selectedVehicleVin && this.vehicles[i].vin === this.selectedVehicleVin) {
            this.vehicles[i].accelerate(5);
          }
        }
      } else if (answers.action === 'Decelerate 5 MPH') {
        for (let i = 0; i < this.vehicles.length; i++) {
          if (this.selectedVehicleVin && this.vehicles[i].vin === this.selectedVehicleVin) {
            this.vehicles[i].decelerate(5);
          }
        }
      } else if (answers.action === 'Stop vehicle') {
        for (let i = 0; i < this.vehicles.length; i++) {
          if (this.selectedVehicleVin && this.vehicles[i].vin === this.selectedVehicleVin) {
            if (this.vehicles[i]) {
              this.vehicles[i].stop();
            }
          }
        }
      } else if (answers.action === 'Turn right') {
        for (let i = 0; i < this.vehicles.length; i++) {
          if (this.selectedVehicleVin && this.vehicles[i].vin === this.selectedVehicleVin) {
            this.vehicles[i].turn('right');
          }
        }
      } else if (answers.action === 'Turn left') {
        for (let i = 0; i < this.vehicles.length; i++) {
          if (this.selectedVehicleVin && this.vehicles[i].vin === this.selectedVehicleVin) {
            this.vehicles[i].turn('left');

          }
        }
      } else if (answers.action === 'Reverse') {
        for (let i = 0; i < this.vehicles.length; i++) {
          if (this.selectedVehicleVin && this.vehicles[i].vin === this.selectedVehicleVin) {
            this.vehicles[i].reverse();
          }
        }
      } else if (answers.action === 'Select or create another vehicle') {
        this.startCli();
        return;
      } else {
        this.exit = true;
      }
      if (!this.exit) {
        this.performActions();
      }
    });
  }
  
  // TODO: add statements to perform the tow action only if the selected vehicle is a truck. Call the findVehicleToTow method to find a vehicle to tow and pass the selected truck as an argument. After calling the findVehicleToTow method, you will need to return to avoid instantly calling the performActions method again since findVehicleToTow is asynchronous.
  // TODO: add statements to perform the wheelie action only if the selected vehicle is a motorbike

  findVehicleToTow(): void {
    inquirer.prompt([
      {
        type: 'list',
        name: 'vehicleToTow',
        message: 'Select a vehicle to tow',
        choices: this.vehicles.map((vehicle: Car | Truck | Motorbike) => {
          return {
            name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
            value: vehicle.vin,
          };
        }),
      },
    ])
    .then((answers) => {
      console.log(`Towing vehicle with VIN: ${answers.vehicleToTow}`);
      this.performActions();
    });
  }

  startCli(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'CreateOrSelect',
          message:
            'Would you like to create a new vehicle or perform an action on an existing vehicle?',
          choices: ['Create a new vehicle', 'Select an existing vehicle'],
        },
      ])
      .then((answers) => {
        if (answers.CreateOrSelect === 'Create a new vehicle') {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }

  // method to start the cli
}

// export the Cli class
export default Cli;
