module.exports = function getOptions(req, res) {
  res.status(200).json({
    selected: 'op0',
    values: [
      {
        value: 'op0',
        text: 'Ламинирование ресниц',
      },
      {
        value: 'op1',
        text: 'Ламинирование  бровей',
      },
      {
        value: 'op2',
        text: 'Стрейчинг ресниц',
      },
      {
        value: 'op3',
        text: 'Счастье для бровей',
      },
      {
        value: 'op4',
        text: 'Ботокс ресниц',
      },
      {
        value: 'op5',
        text: 'Окрашивание ресниц',
      },
    ],

  });
};
