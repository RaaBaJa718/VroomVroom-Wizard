import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';

class Motorbike extends Vehicle {
  vin: string;
  make: string;
  model: string;
  color: string;
  year: number;
  weight: number;
  topSpeed: number;
  frontWheel: Wheel;
  rearWheel: Wheel;

  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    frontWheel: Wheel,
    rearWheel: Wheel
  ) {
    super();
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;
    this.frontWheel = frontWheel;
    this.rearWheel = rearWheel;
  }

  wheelie(): void {
    console.log(`Motorbike ${this.make} ${this.model} is doing a wheelie!`);
  }

  override printDetails(): void {
    super.printDetails();
    console.log(`VIN: ${this.vin}`);
    console.log(`Make: ${this.make}`);
    console.log(`Model: ${this.model}`);
    console.log(`Year: ${this.year}`);
    console.log(`Color: ${this.color}`);
    console.log(`Weight: ${this.weight} lbs`);
    console.log(`Top Speed: ${this.topSpeed} mph`);
    console.log(`Front Wheel: ${this.frontWheel.getDiameter} inch ${this.frontWheel.getTireBrand}`);
    console.log(`Rear Wheel: ${this.rearWheel.getDiameter} inch ${this.rearWheel.getTireBrand}`);
  }
}

export default Motorbike;


