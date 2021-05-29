$(document).ready(function () {
    // timer
    let timer;
    let sec = 59;
    let startTimer = function () {
        if (sec === 0) {
            clearInterval(timer);
            showModal();
            $('.check-btn').trigger('click');
            sec = 59;
            $('.timer').text(`00:00`);
        } else {
            if (sec < 10) sec = '0' + sec;
            $('.timer').text(`00:${sec}`);
            sec--;
        }
    }
    $('.start').click(function () {
        timer = setInterval(startTimer, 1000);
        $('.check').removeAttr('disabled', 'disabled');
        $('.start').attr('disabled', 'disabled');
    })
    //clear right game field
    $('.new').on('click', function () {
        if ($('.box>.piece').length > 0) {
            $('.box>.piece').each(function (i) {
                $(this).appendTo($('.empty').eq(i));
            })
        }
        $('.block.empty').each(function () {
            $(this).removeClass('empty');
        })
        clearInterval(timer);
        sec = 59;
        $('.timer').text(`01:00`);
        $('.check').attr('disabled', 'disabled');
        $('.start').removeAttr('disabled');
    })
    // randomize the pieces
    $('.new').on('click', function () {
        if ($('.box>.piece').length === 0) {
            let parent = $(".output");
            let divs = parent.children();
            while (divs.length) {
                parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
            }
        }
    })
    $(".new").trigger('click');
    // drag and drop
    $('.piece').draggable({
        snap: '.box, .block',
        snapTolerance: 10,
        snapMode: 'inner',
        revert: 'invalid',
        stack: '.piece',
        stop: function () {
            if ($(".box>.piece").length === 1 && !document.querySelector('.start').getAttribute('disabled')) {
                timer = setInterval(startTimer, 1000);
                $('.check').removeAttr('disabled', 'disabled');
                $('.start').attr('disabled', 'disabled');
            }
        },
    });
    $('.box, .block').droppable({
        drop: function (event, ui) {
            if (ui.draggable.parent().hasClass('block')) {
                ui.draggable.parent().addClass('empty')
            }
            if ($(this).children().hasClass('piece')) {
                ui.draggable.animate({
                    left: 0,
                    top: 0
                })
            } else {
                ui.draggable.appendTo($(this));
                ui.draggable.css({
                    left: 0,
                    top: 0
                })
            }
        },
    });
    //modal
    $('.check').click(function () {
        showModal()
    })
    const showModal = function () {
        $('.modal').css({
            zIndex: 100
        })
        $('.modal').animate({
            backgroundColor: 'rgba(0, 0, 0, 0.575)',
        })
        $('.modal-container').animate({
            top: '40px'
        })
    }
    $('.btn-block .close').click(function () {
        $('.modal-container').animate({
            top: '-300px'
        })
        $('.modal').animate({
            backgroundColor: 'transparent',
            zIndex: -100
        })
    })
    $('.modal-message .close').click(function () {
        $('.modal').animate({
            zIndex: -100,
            backgroundColor: 'transparent'
        })
        $('.modal-container').animate({
            top: '-300px'
        });
        $('.modal-message').animate({
            zIndex: -25
        });
    })
    //check
    $('.check-btn').click(function () {
        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
        let result = true;
        if ($('.box>.piece').length === 0) {
            result = false;
        }
        for (let i = 0; i < $('.box>.piece').length; i++) {
            if ($('.box>.piece').eq(i).data('number') !== arr[i]) {
                result = false;
                break
            }
        }
        checking(result);
    })
    const checking = function (res) {
        $('.modal-message').css({ zIndex: 150 });
        if (!res) {
            $('.modal-message .text').text("It's a pity, but you lost");
        } else {
            $('.modal-message .text').text("Woohoo, well done, you did it!");
        }
        clearInterval(timer);
        $('.check').attr('disabled', 'disabled');
    }
})