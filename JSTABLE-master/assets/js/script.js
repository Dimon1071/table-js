$(document).ready(function() {
    
    function toggle() {
        $('#showModal').toggleClass('active')
    }

    $('#create').on('click', toggle)
    $('#close').on('click', toggle)

    //удаление по клику в любую часть экрана
    $('#showModal').on('click', function (e) {     
        if($('.modal-wrapper').has(e.target).length === 0) {
            toggle()
        }
    })  

    // закрытие мод.окна по кнопке esc
    $(document).on('keydown', function(e) {
        if(e.which === 27 && $('#showModal').hasClass('active')) {
            toggle()
        }
    })

    // добавление поста:
    function addPost() {
       
        let title = $('#title');
        let author = $('#author');
        let content = $('#content');

        if(title.val(), author.val(), content.val()){  
            let newPost = {
                id: 1,
                title: title.val(),
                author: author.val(),
                content: content.val(),
                date: new Date().toLocaleTimeString()
            }
    
            let posts = getPosts() // проверка; получение поста по ключу из LocalStorage
            
            if (posts && posts.length) {
                newPost.id = posts[posts.length-1].id
                newPost.id++
            }
            
            posts.push(newPost);
            
            title.val("");   // очистка всех полей после push
            author.val("");
            content.val("");
            
            savePosts(posts)
            allPosts()

        } else {
            alert('Заполните все поля')
        }
    }

    function allPosts(table) {
        let posts = getPosts()
        $('#table > tbody').empty() // в чистом js это - innerHTML ""

        posts.forEach(post => {
            $('#table > tbody').append(`
            <tr class="promo__interactive-list">
                <td style="width: 2%;">${post.id}</td>
                <td style="width: 18%;">${post.title}</td>
                <td style="width: 40%;">${post.content}</td>
                <td style="width: 20%;">${post.author}</td>
                <td style="width: 18%;">${post.date}</td>
                <td style="width: 2%;"><button class="delete" onclick="deletePost(${post.id})">Удалить</button></td>
            </tr>`)
        });
    }
    allPosts()
   
    function savePosts(posts) {
        localStorage.setItem('posts', JSON.stringify(posts))
    }

    function getPosts() {
        let posts = []
        !localStorage.posts ? posts = [] : posts = JSON.parse(localStorage.getItem('posts'))
        return posts
    }

    deletePost = (id) => {  
        if(id) {
            let posts = getPosts()  

            // поиск по id
            let indexPostForDelete = posts.findIndex(post => {
                return post.id == id
            })
            
            posts.splice(indexPostForDelete, 1) // удаление по id 
            
            savePosts(posts)  // сохранение 
            $('#table > tbody').empty() 
            allPosts()

        }
    }
          
    $('#success').on('click', addPost)

});