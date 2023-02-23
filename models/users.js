'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here


      //Posts 모델에서 1:N 
      this.hasMany(models.Posts, { // 2. Posts 모델에게 1:N 관계 설정을 합니다.
        sourceKey: 'nickname', // 3. Users 모델의 nickname 컬럼을
        foreignKey: 'nickname', // 4. Posts 모델의 nickname 컬럼과 연결합니다.
      });

      //Comments 모델에서 1:N
      this.hasMany(models.Comments, { // 2. Comments 모델에게 1:N 관계 설정을 합니다.
        sourceKey: 'nickname', // 3. Users 모델의 userId 컬럼을
        foreignKey: 'nickname', // 4. Comments 모델의 UserId 컬럼과 연결합니다.
      });
    }
  }

  //Q_confirm 지정
  //Q_닉넴,비번,비번확인 타입
  Users.init( 
    {
      nickname: {
        allowNull: false, // NOT NUL
        primaryKey: true, // Primary Key (기본키)
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING  
      },
    
      createdAt: {
        allowNull: false, // NOT NULL
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false, // NOT NULL
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Users',
    }
  );
  return Users;
};