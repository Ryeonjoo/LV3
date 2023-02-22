'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      postId: {
        allowNull: false, // NOT NULL
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // Primary Key (기본키)
        type: Sequelize.INTEGER
      },
      Nickname: { //migration/Users테이블과 연관관계맺는 컬럼이다
        allowNull: false, // NOT NULL
        type: Sequelize.STRING,
        references: { //특정테이블을 지정하기 위해 사용
          model: 'Users', // Users 모델을 참조합니다.
          key: 'nickname', // Users 모델의 nickname을 참조합니다.
        }, //외래키 지정할때 onDelete, onUpdate설정한다
        onDelete: 'CASCADE', // 만약 Users 모델의 nickname이 삭제되면, Posts 모델의 데이터가 함께 삭제됩니다.
      },
      title: {
        allowNull: false, // NOT NULL
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false, // NOT NULL
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false, // NOT NULL
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      },
      updatedAt: {
        allowNull: false, // NOT NULL
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  }
};