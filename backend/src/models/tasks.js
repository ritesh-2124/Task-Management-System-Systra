module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
      title:       { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING },
      status:      { type: DataTypes.ENUM("To Do", "In Progress", "Completed"), defaultValue: "To Do" },
      due_date:    { type: DataTypes.DATE }
    });
  
    return Task;
  };
  