const listTask = document.querySelector('#tasks')
const amountInp = document.querySelector('#amount_text')
const titleInp = document.querySelector('#task_name')
const select = document.querySelector('#type_select')
const addBtn = document.querySelector('#task_added')
const expenseText = document.querySelector('#expense')
const incomeText = document.querySelector('#income')
const totalText = document.querySelector('#amount_of_added')
let expensNum = 0
let incomeNum = 0
renderSaveData()


  // to get code click here
document.querySelector('.code_sign').addEventListener('click',function () {
      let code = document.querySelector('.code_here')
      code.classList.toggle('showhere')
      document.querySelector('.code_sign').innerHTML = '➡️'
})


// for drag and drop functionalty
document.addEventListener('dragstart', e => {
    if (e.target.matches('.task')) {
      e.target.classList.add('draggeditem')
    }
})
document.addEventListener('dragend', e => {
    if (e.target.matches('.task')) {
      e.target.classList.remove('draggeditem')
    }
})

function getAboveItem(container, y) {
    let containeItem = [...container.querySelectorAll('.task:not(.draggeditem)')]

    return containeItem.reduce((closest, child) => {
        let boxPosition = child.getBoundingClientRect()
        let offset = y - boxPosition.top - (boxPosition.height / 2)

        if (offset < 0 && offset > closest.offset) {
            return {offset, element: child}
        }else {
            return closest
        }
    }, {offset: Number.NEGATIVE_INFINITY}).element
}

listTask.addEventListener('dragover', (e) => {
    e.preventDefault()
    const draggedItem = document.querySelector('.draggeditem')
    const afterElement = getAboveItem(listTask, e.clientY)

    if (afterElement == null) {
        listTask.appendChild(draggedItem)
    }else {
        listTask.insertBefore(draggedItem, afterElement)
    }
    
})


function createList(taskValue, amountValue, color) {
   const list = document.createElement('div')
   list.className = 'task'
   list.innerHTML = `
      <div class="text_icon">
            <i class="fa-solid fa-x"></i>
            <p id="task_text">${taskValue}</p>
        </div>
        <h3 id="added_amount" style="color: ${color};">${amountValue}</h3>
   `

   listTask.appendChild(list)

   list.querySelectorAll('i').forEach(icon => {
      icon.addEventListener('click', () => {

        let removedAmount = Number(list.querySelector('#added_amount').textContent)
        let removeColor = list.querySelector('#added_amount').style.color

        if (removeColor === 'red') {
           expensNum -= removedAmount
        }else {
           incomeNum -= removedAmount
        }     
        updateAmounts()

        list.remove()
        saveData()
      })
   });

   listTask.querySelectorAll('.task').forEach(container => {
      container.draggable = "true"
   })
   
}

function taskadd() {
   let titleValue = titleInp.value
   let amountValue = amountInp.value
   let h3Tag = (select.value === 'expense') ? 'red' : 'green'

   if (h3Tag === 'red') {
    expensNum += Number(amountValue)
   }else {
    incomeNum += Number(amountValue)
   }
   updateAmounts()


   
   
   if (!titleValue || !amountValue) {
       alert('Please insert Title and Amount')
       return
    }
    if (titleValue || amountValue) {
        createList(titleValue, amountValue, h3Tag)
        saveData()
        titleInp.value = ''
        amountInp.value = ''
        return
    }
}

function updateAmounts() {
   incomeText.textContent = incomeNum
   expenseText.textContent = expensNum
   totalText.textContent = incomeNum - expensNum

   if (totalText.textContent < 0) {
     totalText.style.color = 'red'
    }else {
       totalText.style.color = 'green'
   }
}

addBtn.addEventListener('click', taskadd)

function saveData() {
    let tasks = []

    listTask.querySelectorAll('.task').forEach(task => {
        let text = task.querySelector('#task_text').textContent
        let amount = task.querySelector('#added_amount').textContent
        let color = task.querySelector('#added_amount').style.color

        tasks.push({ text, amount, color })
    })
    
    let totals = {
        income: incomeNum,
        expense: expensNum
    }
    
    localStorage.setItem('tasks', JSON.stringify(tasks))
    localStorage.setItem('totals', JSON.stringify(totals))
}

function renderSaveData() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []
    let totals = JSON.parse(localStorage.getItem('totals')) || {income: 0, expense: 0}
    
    incomeNum = totals.income
    expensNum = totals.expense
    
    updateAmounts()
    
    tasks.forEach(task => {
        createList(task.text, task.amount, task.color)
    })
}

// the profile functionality function starts here
const firstName = document.querySelector('.profile_name')
const secondName = document.querySelector('#name_text')
const emailD = document.querySelector('#email_text')
const phoneNoD = document.querySelector('#phone_text')

const profileContainer = document.querySelector('.profile_display')
const img = document.querySelector('.image img')
const userName = document.querySelector('.profile_name')
const userInfoContainer = document.querySelector('.information')
const userInfo = userInfoContainer.querySelectorAll('span')
const cancelBtn = document.querySelector('.cancel')
const logOutBtn = document.querySelector('#log_out')
const saveBtn = document.querySelector('#save')
const humBtn = document.querySelector('#humberger')
const pictureValue = document.querySelector('#insert_imgs')


function getEventTarget(type, selector, callback) {
    document.addEventListener(type, e => {
        if (e.target.matches(selector)) {
          callback()
        }
    })
}

getEventTarget('change', '#insert_imgs', () => {
    img.src = URL.createObjectURL(pictureValue.files[0])
})
getEventTarget('click', '#save', ()  => {
   alert("Sorry, it's not functional right now")
})
getEventTarget('click', '#log_out', ()  => {
   const userResponse = confirm('Do u want to reset all expenses and incomes data?')

    if(userResponse === true) {
        alert("happened but u didn't realize it yet")
    }else {
        alert("nothing happend yet")
    }
})

humBtn.addEventListener('click', (e) => {
    e.preventDefault()
    profileContainer.classList.add('display2')
})
cancelBtn.addEventListener('click', (e) => {
    e.preventDefault()
    profileContainer.classList.remove('display2')
})

function profileFunctional() {

  userName.addEventListener('click', () => {
    userName.contentEditable = 'true'
  })
  userName.addEventListener('blur', () => {
    userName.contentEditable = 'false'
  })
  userInfo.forEach( text => {
    text.addEventListener('click', () => {
        text.contentEditable = 'true'
    })
    text.addEventListener('blur', () => {
        text.contentEditable = 'false'
    })
  })

}
profileFunctional()