(window.onload) = function() {

    let modal = document.querySelector('.showModal'),  // модальное окно
        btnCloseModal = document.getElementById('close'), // кнопки закрытия в модальном окне
        create = document.getElementById('create'),  // кнопка вызова модального окна
        modal1 = document.querySelector('.modal-wrapper') // для закрытия мод.окна

    // функция показа мод.окна
    function toggleModal() {
        modal.classList.toggle('active')
    }

    create.addEventListener('click', toggleModal) // вызов мод.окна по клику на кнопку "создать пост"
    btnCloseModal.addEventListener('click', toggleModal)  // закрытие мод.окна 
    
    // закрытие мод.окна при клике на любую часть экрана, кроме мод.окна
    modal1.addEventListener('click', (e) => {
        if(e.target === modal1) {
            toggleModal()
        }
    })
    
    // закрытие мод.окна при нажатии на копку "Escape"
    document.addEventListener('keydown', (e) => {   
        if(e.code === "Escape" && modal.classList.contains('active')) {  // условие: если кликнули на кнопку 
            toggleModal() //  только тогда, когда открыто мод.окно
        }
    })
    
    // добавление поста:
    let btnPublishPost = document.getElementById('success')  // кнопка "опубликовать"
    let title = document.getElementById('title')  // поле "заголовок"
    let author = document.getElementById('author')  // поле "автор"
    let content = document.getElementById('content') // поле "контент"
    let table = document.getElementById('table') // разметка поста в HTML

    // добавление поста
    function addPost() {
        if (title.value && author.value && content.value) {
            let newPost = {
                id: 1,
                title: title.value,
                author: author.value,
                content: content.value,
                date: new Date().toLocaleTimeString()
            }

            let posts = getPosts() // проверка: если в localStorage есть посты, то берем их по ключу(смотреть функцию getPosts)
            
            // если есть пост, то берем последний элемент(объект) в массиве и добавляем свойству id + 1 если массив пуст, то идем дальше
            if (posts && posts.length) {
                newPost.id = posts[posts.length-1].id
                newPost.id++
            }
          
            posts.push(newPost)
            //после push удаляем содиржимое полей
            title.value = ""
            author.value = ""
            content.value = ""
            title.focus()
            
            // сохраняем посты
            savePosts(posts)
            // помещаем разметку в HTML документ
            allPosts()

        } else {
            alert('Заполните все поля')
        }
    }

    function allPosts() {

        let posts = getPosts() // проверка
        
        // добавление резметки в HTML документ
        if (posts && posts.length) {
            table.innerHTML = ""
            posts.forEach((post) => {
                table.innerHTML += `
                    <tr class="promo__interactive-list">
                        <td style="width: 2%;">${post.id}</td>
                        <td style="width: 18%;">${post.title}</td>
                        <td style="width: 40%;">${post.content}</td>
                        <td style="width: 20%;">${post.author}</td>
                        <td style="width: 18%;">${post.date}</td>
                        <td style="width: 2%;"><button class="delete" onclick="deletePost(${post.id})">Удалить</button></td>
                    </tr>`
            })
            
        }
        
    }
    allPosts() // вызываем в общем потоке, для отображение существующих постов при открытии стр

    deletePost = (id) => {  // параметр передается в onclick при создании разметки (allposts)
        if(id) {
            let posts = getPosts()  // проверка

            // поиск по id
            let indexPostForDelete = posts.findIndex(post => {
                return post.id == id
            })
            
            posts.splice(indexPostForDelete, 1) // удаление по id 
            
            savePosts(posts)  // сохранение

            table.innerHTML = "" 
            
            allPosts() 
            
        }
        
    }
    
    function getPosts() {
        let posts = []
        !localStorage.posts ? posts = [] : posts = JSON.parse(localStorage.getItem('posts'))
        return posts
    }

    function savePosts(posts) {
        localStorage.setItem('posts', JSON.stringify(posts))
    }

    btnPublishPost.addEventListener('click', addPost)
    modal.addEventListener('keydown', (e) => {
        if(e.code === "Enter") {
            addPost()
        }
    })

}