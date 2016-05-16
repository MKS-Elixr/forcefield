# API Outline

## GET /schools (returns a list of all schools)

```
[
  {
    name: 'MakerSquare'
  },
  {
    name: 'Riverside'
  },
  {
    name: 'Mizzou'
  }
]
```

## GET /schools/:school/students (returns all students in a school)

```
[
  {
    name: 'Mark Castle',
    joined: 'timestamp',
    email: 'mark@castle.sx',
    phone: '573.552.1944',
    id: 'j39hj82nd9',
    url: 'avatar.com/mark.jpeg'
  },
  {
    name: 'Xiaolu Bai',
    joined: 'timestamp',
    email: 'abc@def.g',
    phone: '012.345.6789',
    id: '4930cn2ns',
    url: 'avatar.com/xiaolu.jpeg'
  }
]
```

## GET /schools/:school/emergencies (returns all emergencies in a school)

```
[
  {
    id: '5LXP1',
    by: 'Chris Csekey',
    started: 'timestamp',
    ended: 'null',
    locations: [
      {
        timestamp: 'number',
        latitude: 'number',
        longitude: 'number'
      },
      {
        timestamp: 'number',
        latitude: 'number',
        longitude: 'number'
      },
      {
        timestamp: 'number',
        latitude: 'number',
        longitude: 'number'
      }
    ],
    active: true
  },
  {
    id: 'P90QM',
    by: 'Dain',
    started: 'timestamp',
    ended: 'timestamp',
    locations: [
      {
        timestamp: 'number',
        latitude: 'number',
        longitude: 'number'
      },
      {
        timestamp: 'number',
        latitude: 'number',
        longitude: 'number'
      },
      {
        timestamp: 'number',
        latitude: 'number',
        longitude: 'number'
      }
    ],
    active: false
  }
]
```
