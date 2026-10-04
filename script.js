// مصفوفة الطلاب
const students = [];


// جلب عناصر HTML
const studentForm = document.getElementById("studentForm");
const studentName = document.getElementById("studentName");
const dept = document.getElementById("dept");
const level = document.getElementById("level");
const system = document.getElementById("system");
const status = document.getElementById("status");

const tableBody = document.getElementById("tableBody");
const searchInput = document.getElementById("searchInput");
const filterDept = document.getElementById("filterDept");
const filterLevel = document.getElementById("filterLevel");

const totalStudents = document.getElementById("totalStudents");
const deptStudents = document.getElementById("deptStudents");

const resetBtn = document.getElementById("resetBtn");
const showAllBtn = document.getElementById("showAllBtn");


// دالة إضافة الطالب
function addStudent() {

    const student = {
        name: studentName.value.trim(),
        dept: dept.value,
        level: level.value,
        system: system.value,
        status: status.value
    };

    if (student.name === "" || student.dept === "" || student.level === "") {
        alert("يرجى إدخال جميع بيانات الطالب");
        return;
    }

    students.push(student);

    showStudents();

    studentForm.reset();

    alert("تمت إضافة الطالب بنجاح");
}


// دالة عرض الطلاب
function showStudents() {

    tableBody.innerHTML = "";

    const search = searchInput.value.trim().toLowerCase();
    const selectedDept = filterDept.value;
    const selectedLevel = filterLevel.value;

    let count = 0;

    for (let i = 0; i < students.length; i++) {

        const student = students[i];

        const nameMatch = student.name.toLowerCase().includes(search);
        const deptMatch = selectedDept === "" || student.dept === selectedDept;
        const levelMatch = selectedLevel === "" || student.level === selectedLevel;

        if (nameMatch && deptMatch && levelMatch) {

            const row = document.createElement("tr");

            row.innerHTML =
                "<td>" + (i + 1) + "</td>" +
                "<td>" + student.name + "</td>" +
                "<td>" + student.dept + "</td>" +
                "<td>" + student.level + "</td>" +
                "<td>" + student.system + "</td>" +
                "<td>" + student.status + "</td>" +
                "<td>" +
                "<button class='editBtn' onclick='editStudent(" + i + ")'>تعديل</button>" +
                "<button class='deleteBtn' onclick='deleteStudent(" + i + ")'>حذف</button>" +
                "</td>";

            tableBody.appendChild(row);

            count++;
        }
    }

    totalStudents.innerText = students.length;
    deptStudents.innerText = count;
}


// دالة حذف طالب
function deleteStudent(index) {

    const answer = confirm("هل تريد حذف هذا الطالب؟");

    if (answer) {
        students.splice(index, 1);
        showStudents();
    }
}


// دالة تعديل طالب
function editStudent(index) {

    studentName.value = students[index].name;
    dept.value = students[index].dept;
    level.value = students[index].level;
    system.value = students[index].system;
    status.value = students[index].status;

    students.splice(index, 1);

    showStudents();

    studentName.focus();
}


// إضافة الطالب عند إرسال النموذج
studentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    addStudent();

});


// البحث عن الطالب
searchInput.addEventListener("input", function() {

    showStudents();

});


// فلترة حسب القسم
filterDept.addEventListener("change", function() {

    showStudents();

});


// فلترة حسب المستوى
filterLevel.addEventListener("change", function() {

    showStudents();

});


// عرض جميع الطلاب
showAllBtn.onclick = function() {

    searchInput.value = "";
    filterDept.value = "";
    filterLevel.value = "";

    showStudents();

};


// مسح جميع الطلاب
resetBtn.onclick = function() {

    const answer = confirm("هل تريد مسح جميع بيانات الطلاب؟");

    if (answer) {
        students.length = 0;
        showStudents();
    }
};


// بيانات تجريبية
students.push(
    {
        name: "محمد إبراهيم",
        dept: "نظم معلومات",
        level: "الثاني",
        system: "عام",
        status: "منتظم"
    },

    {
        name: "أحمد علي",
        dept: "علوم حاسوب",
        level: "الأول",
        system: "عام",
        status: "منتظم"
    },

    {
        name: "خالد محمد",
        dept: "امن سيبراني",
        level: "الثالث",
        system: "موازي",
        status: "منتظم"
    }
);


// عرض الطلاب عند تشغيل الصفحة
showStudents();
