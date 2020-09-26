// Group by location and State
// db, persons, aggregate must be in the same line
db.persons
  .aggregate([
    { $match: { gender: 'female' } },
    {
      $group: { _id: { state: '$location.state' }, totalPersons: { $sum: 1 } },
    },
    { $sort: { totalPersons: -1 } },
  ])
  .pretty();

// Age > 50
// - Group by gender
// - Sum per gender
// Find avg
// Order by total person
db.persons
  .aggregate([
    { $match: { 'dob.age': { $gt: 50 } } },
    {
      $group: {
        _id: { gender: '$gender' },
        totalPersons: { $sum: 1 },
        averageAge: { $avg: '$dob.age' },
      },
    },
    { $sort: { totalPersons: -1 } },
  ])
  .pretty();
