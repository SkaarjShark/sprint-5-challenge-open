async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  // window.addEventListener("load", async (evt) => {
    try {

      // let mentorURL = "http://localhost:3003/api/mentors"
      // await axios.get(mentorURL)
      //   .then(res => {
      //     console.log(res.data)
      //   })

      let learnerURL = "http://localhost:3003/api/learners"
      let mentorURL = "http://localhost:3003/api/mentors"
      await axios.get(learnerURL)
        .then(res => {
          document.querySelector(".info").textContent = "No learner is selected"
          console.log(res.data)

          const cardContainer = document.querySelector(".cards")
          for (let i = 0; i < res.data.length; i++) {
            // Creating the parts of the card
            const card = document.createElement("div")
            card.classList.add("card")
            const h3 = document.createElement("h3")
            h3.textContent = res.data[i].fullName
            const email = document.createElement("div")
            email.textContent = res.data[i].email
            const h4 = document.createElement("h4")
            h4.classList.add("closed")
            h4.textContent = "Mentors"
            const ul = document.createElement("ul")
            // Unordered List Items Loop
            for (let j = 0; j < res.data[i].mentors.length; j++) {
              const li = document.createElement("li")
              li.textContent = res.data[i].mentors[j]
              ul.appendChild(li)
            }
            // Designing selecting cards
            card.addEventListener("click", (evt) => {
              for (let i = 0; i < cardContainer.children.length; i++) {
                if (cardContainer.children[i].classList.contains("selected") && cardContainer.children[i] !== card) {
                  cardContainer.children[i].classList.remove("selected")
                  cardContainer.children[i].firstChild.textContent = res.data[i].fullName
                }
              }
              //if (evt.target !== h4) {
                if (card.classList.contains("selected") && evt.target !== h4) {
                  card.classList.remove("selected")
                  card.firstChild.textContent = res.data[i].fullName
                  document.querySelector(".info").textContent = "No learner is selected"
                } else {
                  card.classList.add("selected")
                  document.querySelector(".info").textContent = `The selected learner is ${res.data[i].fullName}`
                  h3.textContent = `${res.data[i].fullName}, ID ${res.data[i].id}`
                }
              //}
            })
            // Designing the mentors drop down
            h4.addEventListener("click", () => {
              if (h4.classList.contains("closed")) {
                h4.classList.remove("closed")
                h4.classList.add("open")
              } else {
                h4.classList.remove("open")
                h4.classList.add("closed")
              }
            })
            // Appending the children
            card.appendChild(h3)
            card.appendChild(email)
            card.appendChild(h4)
            card.appendChild(ul)
            cardContainer.appendChild(card)
          }
        })
        
      // Building the mentors
      // let mentorURL = "http://localhost:3003/api/mentors"
      await axios.get(mentorURL)
        .then(res => {
          console.log(res.data)

          document.querySelectorAll(".card ul li").forEach(listItem => {
            for (let i = 0; i < res.data.length; i++) {
              if (listItem.textContent === res.data[i].id.toString()) {
                listItem.textContent = `${res.data[i].firstName} ${res.data[i].lastName}`
              }
            }
          })
        })
    }
    catch(err) {
      document.querySelector(".info").textContent = "SORRY!! Something went wrong..."
      console.log(err)
    }
  // })
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
