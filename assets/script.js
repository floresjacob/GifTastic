// Example queryURL for Giphy API
    var btnCount = 0
    var topics = []

    $("#submit").on("click", function(){
      event.preventDefault()
      var search = $("#text").val()
      var gifs = $("<div class='col-md-8' id='gifs'>")
      $("#gifBox").html(gifs)

      queryURL = "https://api.giphy.com/v1/gifs/search"

      queryURL += "?" + $.param ({
        "api_key": "uDQTRS9WSwwjC3fC32Lg8Ay43awVm3b9",
        "q" : search,
        "limit" : 10
      })

      $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(response) {
      
      $("#btn-header").append("<div class='btn btn-default' id='btnTag'>"+ search +"</div>")
      btnCount++
      topics.push(search)
      console.log("tags: " + topics)
    })
    $("form").trigger("reset")

    })

    $(document).on("click", "#btnTag", function(){
      event.preventDefault()
      console.log($(this).text())
      
      var gifs = $("<div class='col-md-8' id='gifs'>")
      $("#gifBox").html(gifs)
      
      var tagURL = "https://api.giphy.com/v1/gifs/search"  
      tagURL += "?" + $.param ({
        "api_key": "uDQTRS9WSwwjC3fC32Lg8Ay43awVm3b9",
        "q" : $(this).text(),
        "limit" : 10
      })

      $.ajax({
      url: tagURL,
      method: 'GET'
    }).then(function(response) {
        for(i = 0; i<response.data.length; i++){ 
          console.log(response.data[i]) 
          var rating = response.data[i].rating
          var link = response.data[i].bitly_gif_url
          var thumbnail = $("<div class='panel panel-default'><div class='panel-body'><img class='img-responsive' id='vid' state='still' anim="+response.data[i].images.fixed_height.url+" still="+response.data[i].images.fixed_height_still.url+" src='"+response.data[i].images.fixed_height_still.url+"'></div><div class='panel-footer'>Rating: "+rating+"</div></div>")
          $(gifs).prepend(thumbnail)
        }
      })
    })

    $(document).on("click", "#vid", function(){
      event.preventDefault()
      console.log($(this).attr("anim"))
      if($(this).attr("state") === "still"){  
        $(this).attr("src",$(this).attr("anim"))
        $(this).attr("state", "play")
      }
      else{
        $(this).attr("src",$(this).attr("still"))
        $(this).attr("state", "still")
      }

    })
