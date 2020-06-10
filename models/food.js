module.exports = (sequelize, DataTypes) => {
    const Food = sequelize.define('food', {
        nameOfFood: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: DataTypes.STRING,
        //add image here? or is that too much? how? ENUM? not sure exactly how to use it
        linkToRecipe: {
            type: DataTypes.STRING,//another DataType? ENUM for link, or just do <a>tag in React/Client
            allowNull: true
        },
        category: {//limit to certain types like sides, sandwiches, etc how do i do that? ENUM
            type: DataTypes.STRING,//or .ENUM('Apps', 'Sides', 'Sandwiches', 'Entrees', 'Snacks', 'Breakfast', 'Other'),
        //so that i can create an endpint or sort based on category
            allowNull: false
        },
        cuisine: {//limit to certain types like Indian, American, Mexican, Peruvian, etc how do i do that?
            type: DataTypes.STRING,//orENUM('American', 'Mexican', 'Indian', 'South American', 'Mediterranean', 'Thai', 'European', 'Vietnamese', 'Asian', 'Peruvian', 'Other'),
            //to be able to create and endpoint or sort based on cuisine
            allowNull: false
        },
        descriptionOfFood: {//description or notes on item or recipe I tried
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Food;
}