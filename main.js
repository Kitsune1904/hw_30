const gradation = [
  {
    maxBall: 20,
    description: "satisfactory",
  },
  {
    maxBall: 55,
    description: "good",
  },
  {
    maxBall: 85,
    description: "very-good",
  },
  {
    maxBall: 100,
    description: "excellent",
  },
];

const users = [
  {
    name: "Jack Smith",
    age: 23,
    img: "JackSmith",
    role: "student",
    courses: [
      {
        title: "Front-end Pro",
        mark: 20,
      },
      {
        title: "Java Enterprise",
        mark: 100,
      },
    ],
  },
  {
    name: "Amal Smith",
    age: 20,
    img: "AmalSmith",
    role: "student",
  },
  {
    name: "Noah Smith",
    age: 43,
    img: "NoahSmith",
    role: "student",
    courses: [
      {
        title: "Front-end Pro",
        mark: 50,
      },
    ],
  },
  {
    name: "Charlie Smith",
    age: 18,
    img: "CharlieSmith",
    role: "student",
    courses: [
      {
        title: "Front-end Pro",
        mark: 75,
      },
      {
        title: "Java Enterprise",
        mark: 23,
      },
    ],
  },
  {
    name: "Emily Smith",
    age: 30,
    img: "EmilySmith",
    role: "admin",
    courses: [
      {
        title: "Front-end Pro",
        score: 10,
        lector: "Leo Smith",
      },
      {
        title: "Java Enterprise",
        score: 50,
        lector: "David Smith",
      },
      {
        title: "QA",
        score: 75,
        lector: "Emilie Smith",
      },
    ],
  },
  {
    name: "Leo Smith",
    age: 253,
    img: "LeoSmith",
    role: "lector",
    courses: [
      {
        title: "Front-end Pro",
        score: 78,
        studentsScore: 79,
      },
      {
        title: "Java Enterprise",
        score: 85,
        studentsScore: 85,
      },
    ],
  },
];

class User {
  constructor({ name, age, img, role, courses = [] }) {
    this.name = name;
    this.age = age;
    this.img = img;
    this.role = role;
    this.courses = courses;
  }

  _getMark(mark) {
    for (let i = 0; i < gradation.length; i++) {
      if (mark <= gradation[i].maxBall) {
        return gradation[i].description;
      }
    }
  }

  _renderCourses() {
    if (this.courses.length !== 0) {
      return `
		<div class="courses-holder">
			${this.courses.map((course) => 
				`<div class="courses ${this.role}">
					<p>${course.title} <span class="${this._getMark(course.mark)}">${this._getMark(course.mark)}</span></p>
				</div>`).join("")}
		</div>`;
    } else {
      return "";
    }
  }

  render() {
    return `
	<div class="card">
		<div class="about">
			<img src="./images/users/${this.img}.png" alt="users photo">
			<div>
				<p>Name: <span>${this.name}</span></p>
				<p>Age: <span>${this.age}</span></p>
			</div>
		</div>	
		<div class="role">
			<img src="./images/roles/${this.role}.png" alt="role logo">
			<p>${this.role}</p>
		</div>
		${this._renderCourses()}	
	</div>`;
  }
}

class Student extends User {
  constructor(user) {
    super(user);
  }
}

class Admin extends User {
  constructor(user) {
    super(user);
  }

  _renderCourses() {
    if (this.courses.length !== 0) {
      return `
		<div class="courses-holder">
			${this.courses.map((course) =>  
				`<div class="courses ${this.role}">
					<p>Title: <span>${course.title}</span></p>
					<p>Admin's score: <span class="${this._getMark(course.score)}">${this._getMark(course.score)}</span></p>
					<p>Lector: <span>${course.lector}</span></p>
				</div>`).join("")}
		</div>`;
    } else {
      return "";
    }
  }
}

class Lector extends User {
  constructor(user) {
    super(user);
  }

  _renderCourses() {
    if (this.courses.length !== 0) {
      return `
		<div class="courses-holder">
			${this.courses.map((course) => 
				`<div class="courses ${this.role}">
					<p>Title: <span>${course.title}</span></p>
					<p>Lector's score: <span class="${this._getMark(course.score)}">${this._getMark(course.score)}</span></p>
					<p>Average student's score:  <span class="${this._getMark(course.score)}">${this._getMark(course.studentsScore)}</span></p>
				</div>`).join("")}
		</div>`;
    } else {
      return "";
    }
  }
}

function createCard(user) {
  switch (user.role) {
    case "student":
      return new Student(user);
    case "admin":
      return new Admin(user);
    case "lector":
      return new Lector(user);
    default:
      return new User(user);
  }
}

users.forEach((user) => (document.body.innerHTML += createCard(user).render()));
