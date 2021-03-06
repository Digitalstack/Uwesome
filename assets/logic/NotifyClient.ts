class NotifyClientClass {

    public init(socket, token, timeagoInstance, lang) {

        $('[data-func="display-friend-requests"]').click(function() {
            $('[id="globalNotifications"]').hide()
            $('[id="messagesNotifications"]').hide()
        })

        $('[data-func="display-global-notifications"]').click(function() {
            $('[id="friendRequests"]').hide()
            $('[id="messageNotifications"]').hide()
        })

        const langTemplate = (sentence, lang) => {
            if(sentence == 'no.friend.request')
                return lang == 'fr' ? 'Aucune demande d\'ami' : 'No friend request'
            if(sentence == 'loading')
                return lang == 'fr' ? 'Chargement...' : 'Loading...'
            if(sentence == 'request.made')
                return lang == 'fr' ? 'Demande faite' : 'Request sent'
        }

        const loading  = () => {

            return ('<div class="topbar-box-loading">'+ langTemplate('loading', lang) +'</div>')

        }


        // Les icones
        const topbarIcon = $('[id=topbarIcon]')

        for(let i = 0; i < topbarIcon.length; i++) {

            // Lors du clic
            let state = $(topbarIcon[i]).data('state')
            $(topbarIcon[i]).click(() => {

                const $this = $(topbarIcon[i])

                // Variables et constantes
                const func = $this.data('func')
                const data = $this.data('td')
                const box = $('[id='+ data.target +']')

                // Si il n'y a aucune donnée chargée
                if(state == 'no') {

                    $(box).find('[id='+ data.displayTarget +']').html(loading())
                    // On affiche la box
                    box.fadeIn(200)

                    // On change les state
                    state = 'loaded'
                    $this.attr('data-state', 'loaded')

                    // On affiche le loader
                    $this.find('.topbar-box-in').html(loading())

                    // Si il s'agit des demandes d'amis
                    if(func == 'display-friend-requests') {

                        setTimeout(() => {
                            // On demande a obtenir les demandes
                            socket.emit('catch-friend-requests', token)

                        }, 500)

                    }

                } else if (state == 'loaded'){

                    state = 'no'
                    $this.attr('data-state', 'no')

                    box.fadeOut(200)

                }

            })

        }

        /*
        Demandes d'ami
         */
        const friendRequestsTemplate = (has, data?) => {

            if(has) {

                return (
                    '<div class="chips">\
                        <div class="chips-in">\
                            <div class="chips-image" style="'+ data.emitter.avatar +'"></div>\
                        <a href="/user/'+ data.emitter.username +'" class="chips-title" title="Voir le profil de '+ data.emitter.username +'">'+ data.emitter.username +'</a>\
                        <span class="chips-text">'+ langTemplate('request.made', lang) +' <span class="timeAgo" datetime="'+ data.friendRequest.request_date +'">...</span></span>\
                        <div class="chips-choice">\
                            <button class="button button-chips button-chips-colored" data-gd=\'{ "token" : "'+ data.emitter.token +'" }\'>Accepter</button>\
                            <button class="button button-chips button-chips-default">Refuser</button>\
                        </div>\
                    </div>\
                </div>'
                )

            } else {

                return (
                    '<div class="topbar-box-message">'+ langTemplate('no.friend.request', lang) +'</div>'
                )

            }

        }

        socket.on('before-display-friend-requests', (token) => {

            $('#friendRequestsDisplay').html('')

            socket.emit('get-friend-requests', token)

        })

        // Si il y a des demandes d'ami
        socket.on('display-friend-requests', (data) => {

            console.log(data.friendRequest.id)

            $('#friendRequestsDisplay').prepend(friendRequestsTemplate(true, data))

            timeagoInstance.render($('.timeAgo'), lang);

        })

        // Si il n'y a pas de demandes d'ami
        socket.on('no-friend-request', () => {

            $('#friendRequestsDisplay').html('')

            $('#friendRequestsDisplay').html(friendRequestsTemplate(false))

        })


    }

}

const NotifyClient = new NotifyClientClass;