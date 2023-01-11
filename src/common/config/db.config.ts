import * as mongoose from 'mongoose';

export class DB {
  // THIS STRING IS THE LINK TO OUR MONGODB
  static async Init() {
    try {
      await mongoose.connect('mongodb+srv://root:1ZHtmHrSTI83JSTI@mkn-prod-db.5meoa.mongodb.net/?retryWrites=true&w=majority');
    } catch (err) {
      console.error(err);
    }
  }
}
