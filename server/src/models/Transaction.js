const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const User = require('./User');
const Category = require('./Category');
const ScheduledTransaction = require('./ScheduleTransaction');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Category,
      key: 'id',
    },
  },
  scheduledTransactionId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: ScheduledTransaction,
      key: 'id',
    },
  },
  transactionType: {
    type: DataTypes.ENUM('income', 'expense'),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

Transaction.belongsTo(User, {
  foreignKey: 'UserId',
  onDelete: 'CASCADE',
});

Transaction.belongsTo(Category, {
  foreignKey: 'CategoryId',
  onDelete: 'SET NULL', // Set CategoryId to NULL if category is deleted
});

Transaction.belongsTo(ScheduledTransaction, {
  foreignKey: 'ScheduledTransactionId',
  onDelete: 'SET NULL', // If the scheduled transaction is deleted, set the reference to NULL
});

module.exports = Transaction;