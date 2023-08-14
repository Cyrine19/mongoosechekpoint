const mongoose  = require ('mongoose');
const {Person} = require ('./person');

mongoose.connect('mongodb+srv://syrineba9:<password>@cluster0.ngh7lq5.mongodb.net/?retryWrites=true&w=majority',{
    userNewUrlParser:true,
    useUnifiedTopology:true
})

    .then(async ()=>{
        console.log('connected to MongoDB');
        const arrayOfPeople =[
            { name: 'Amine',age:28,favoriteFoods:['Pasta','Pizza']},
            {name: 'Bob', age:30,favoriteFoods:['Burger','Salad']},
            {name:'Charlie',age:25, favoriteFoods : ['Sandwich', 'Sushi']}
        ];
        try {
            const createdPeople = await Person.create(arrayOfPeople);
            console.log('Created people:', createdPeople);
        
        } catch (error) {
            console.error('Error creating people:', error);
        };
        //close the database connection 
        mongoose.connection.close();
    })
//4) Use model.find() to Search Your Database:
        try {
            const foundPeople = await Person.find({ name: 'Amine' });
            console.log('Found people:', foundPeople);
        } catch (error) {
            console.error('Error finding people:', error);
        }
//5)Use model.findOne() to Return a Single Matching Document from Your Database:
        try {
            const foundPerson = await Person.findOne({ name: 'Bob' });
            console.log('Found person:', foundPerson);
        } catch (error) {
            console.error('Error finding person:', error);
        }
//6 Use model.findById() to Search Your Database By _id
    const personId = 'your-person-id';
    try {
        const foundPerson = await Person.findById(personId);
        if(foundPerson){
            console.log('Found person :', foundPerson);
        } else {
            console.log('Person not found');
        }
    }catch(error) {
        console.error('Error finfind person by ID', Error);
    }
//7) Update an Existing Record in your Collection Using Model.updateOne():
    try {
        const foundPerson = await Person.findById(personId);
        if (foundPerson){
            console.log('Found person:',foundPerson);
            foundPerson.favoriteFoods.push('hamburger');
            //save the updated person
            const updatedPerson = await foundPerson.save();
            return  console.log(`Updated person:${updatedPerson}`);
        } else {
            console.log('Person not found');
        }
    } catch(error){
        console.error('Error updating person', error);
    }
//8)Perform New Updates on a Document Using model.findOneAndUpdate()
const personName = 'Alice';
try{
    const updatedPerson = await Person.fondOneAndUpdate(
        {_name:'Alice'}, {$set:{age:20}},{new:true}
    );
        if (updatedPerson){
            console.log('Updated person', updatedPerson);
        } else {
            console.log('Person not found');
        }
    }catch(errror){
        console.error('Error updating person:', error);
        };
    
//9) Delete One Document Using model.findByIdAndRemove:
try {
    const deletedPerson=await Person.findByIdAndDelete(_id);
    if (!deletedPerson){
        throw new Error ('No document with that id was found.');
    }
    else {
        console.log('person no found');
    }
    } catch(error){
        consolle.error('Error deleting person', errro);
        }
//10Delete One Document Using model.findByIdAndRemove:
try {
    const deletedPerson = await Person.findByIdAndRemove(personId);

    if (deletedPerson) {
        console.log('Deleted person:', deletedPerson);
    } else {
        console.log('Person not found.');
    }
} catch (error) {
    console.error('Error deleting person:', error);
}
//11)MongoDB and Mongoose - Delete Many Documents with model.remove()
const nameToDelete = 'Charlie';

    try {
        const result = await Person.remove({ name: nameToDelete });

        if (result.deletedCount > 0) {
            console.log(`Deleted ${result.deletedCount} people with name "${nameToDelete}".`);
        } else {
            console.log(`No people with name "${nameToDelete}" found.`);
        }
    } catch (error) {
        console.error('Error deleting people:', error);
    }
//12)Chain Search Query Helpers to Narrow Search Results   
Person.find({favoriteFoods:'Pizza'})
    .sort('name')
    .limit(2)
    .select('age')
    .exec((err,data)=>{
        if(err){
            console.error("ERROR:",err)
        }else {console.log("People who like Pizza", data);}

        }
    )



    
        