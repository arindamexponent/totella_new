<template>
    <div class="messagewrap">
        <section class="profilepage">
            <div class="container">

                <div class="row row_18">
                    <div class="col-lg-3 col-md-3 col-sm-4 leftdbmenucol">
                        
                        <user-profile-card></user-profile-card>

                        <left-aside-nav></left-aside-nav>
                    </div>

                    <div class="col-lg-9 col-md-9 col-sm-8 procolleft">
                        <div class="msgOverlay"></div>
                        
                        <h3 class="dbcontitle">Messages</h3>
                        <div class="white-bg">
                            <div class="panel-body chathead">
                                <h4 class="chatitle">Chat</h4>
                                
                                <h4 class="textSubj"><span>Coiffeur a domicile</span></h4>


                            </div>
                            <div class="msgpanel clearfix">
                                <div class="msgLeftPanel" style="position:relative;">
                                    <div class="adploading msgload leftload" v-if="leftLoad">
                                        <!-- <img src="assets/images/paginate-load.gif" alt="image" style="width:40px; transform: translate(-50%, -470%);"> -->
                                    </div>
                                    <div class="selFld">
                                        <select class="form-control">
                                            <option>All</option>
                                        </select>
                                    </div>
                                    <ul class="msgMembers">
                                        <li v-for="user in leftUserList" :key="user.id">
                                            <a href="javascript:void(0);" class="msgUserItem" :id="`cUser-${user.to_user_id}`" @click="changeUser(user.UserDetails.id)">
                                                <span class="uPhoto">
                                                    <figure v-if="user.UserDetails.profile_picture != null">
                                                        <img :src="`${url}${user.UserDetails.profile_picture}`" class="img-responsive center-block" alt="Avatar">
                                                    </figure>
                                                    <figure v-else>
                                                        <img :src="`${noimgurl}default_avatar.jpg`" class="img-responsive center-block" alt="Avatar">
                                                    </figure>
                                                    <span class="uonOff on"></span>
                                                </span>
                                                <span class="uNm">{{user.UserDetails.first_name}} {{user.UserDetails.last_name}}</span>
                                                <span class="uLoc">{{user.UserDetails.city == null ? 'No city provided' : user.UserDetails.city}}</span>
                                            </a>
                                        </li>

                                    </ul>
                                </div>
                                <div class="messageListCont">
                                    <a href="javascript:void(0);" class="headr frndClk">
                                        <span class="tl">
                                            <i class="fa fa-users"></i>  Friends
                                        </span>
                                    </a>
                                    <div class="messages" id="msgArea" @scroll="scrollUp" style="position: relative">
                                        <!-- <pre>{{currentUserDetails | json}}</pre> -->

                                        <div class="adploading msgload" v-if="msgLoad">
                                            <img src="assets/images/paginate-load.gif" alt="image" style="width:40px;">
                                        </div>


                                        <div v-else class="list" :class="{'me': msg.from_user_id == authData.id}" v-for="msg in messageList" :key="msg.id">
                                            <div class="msgUser">
                                                <img v-if="msg.from_user_id == authData.id" :src="authData.profile_picture" class="img-responsive" alt="Avatar">
                                                <span v-else>
                                                    <img v-if="currentUserDetails.UserDetails.profile_picture != null" :src="`${url}${currentUserDetails.UserDetails.profile_picture}`" class="img-responsive" alt="Avatar">
                                                    <img v-else :src="`${noimgurl}default_avatar.jpg`" class="img-responsive" alt="Avatar">
                                                </span>
                                            </div>
                                            <span class="nm" v-if="msg.from_user_id == authData.id">{{authData.first_name}} {{authData.last_name}}</span>
                                            <span class="nm" v-else>{{currentUserDetails.UserDetails.first_name}} {{currentUserDetails.UserDetails.last_name}}</span>
                                            <div class="msgTxt">
                                                <p v-if="msg.type == 'T'">{{msg.message}}</p>
                                                <p v-if="msg.type == 'F'">
                                                    <a :href="`${chatFileUrl}${msg.file_name}`" target="_blank" style="color:#fff;word-wrap: break-word;">
                                                        {{msg.message}}
                                                    </a>
                                                </p>
                                            </div>
                                            <span class="date">{{msg.created_at | moment("MMMM Do YYYY, h:mm")}}</span>
                                        </div>
                                        <!-- <div class="proposition radd100"><span>John Doe Send you a Proposition: 10€</span></div> -->
                                        <!-- <div class="threbtn clearfix">
                                            <a href="#" class="btn btn-lg btn-warning radd100">Decline</a>
                                            <div class="shwcountt">
                                                <span class="textshw btn-block radd100 btn">12</span>
                                                <p>Make Proposition</p>
                                            </div>
                                            <a href="#" class="btn btn-lg btn-success radd100">Accept</a>
                                        </div> -->
                                    </div>
                                    <div class="typemsgArea">
                                        <form @submit.prevent="sendMessage">
                                            <div class="bx chatemojiwrap" style="posiTion: relative">
                                                <textarea v-model="createMsg.text" placeholder="Type Your Text"></textarea>
                                                <div class="msgBtns">
                                                    <label class="msgAttach">
                                                        <input type="file" @change="sendFileMessage($event)">
                                                        <img src="assets/images/msg-pin.png" alt="">
                                                    </label>
                                                    <a href="javascript:void(0);" class="msgEmogi">
                                                        <img src="assets/images/msg-emoji.png" alt="">
                                                    </a>
                                                    <input type="submit" value="Send" class="btn btn-default btn-grey">
                                                </div>

                                                <div class="emoji-wrap">
                                                    <emoji-picker @emoji="insert" :search="search">
                                                        <div class="emoji-invoker" slot="emoji-invoker" slot-scope="{ events }" v-on="events">
                                                            <button type="button" class="openemochat">
                                                                <img data-v-68fd8bee="" src="assets/images/msg-emoji.png" alt="">
                                                            </button>
                                                        </div>
                                                        <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
                                                            <div class="emojiBx">
                                                                <div class="contnr">
                                                                    <div>
                                                                        <input type="text" v-model="search">
                                                                    </div>
                                                                    <div>
                                                                        <div v-for="(emojiGroup, category) in emojis" :key="category">
                                                                            <h5>{{ category }}</h5>
                                                                            <div>
                                                                                <span
                                                                                    v-for="(emoji, emojiName) in emojiGroup"
                                                                                    :key="emojiName"
                                                                                    @click="insert(emoji)"
                                                                                    :title="emojiName"
                                                                                >{{ emoji }}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </emoji-picker>
                                                </div>


                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { HTTP, AUTH_DATA, TOKEN } from '../../http';
import { config } from '../../config';

import LeftAsideNav from '@/components/LeftAsideNav';
import UserProfileCard from '@/components/UserProfileCard';

import EmojiPicker from 'vue-emoji-picker';


export default {
    name: 'Message',
    components: {
        'left-aside-nav': LeftAsideNav,
        'user-profile-card': UserProfileCard,
        EmojiPicker
    },
    data() {
        return {
            authData: AUTH_DATA,
            otherUserId: '',
            myUserId: '',
            leftUserList: [],
            url: config.profile_chat_upload,
            noimgurl: config.profile_no_chat_upload,
            chatFileUrl: config.chat_files,
            chatInterval: config.chat_refresh_interval,
            from_user_id: AUTH_DATA.id,
            leftLoad: false,
            msgLoad: false,
            to_user_id: '',
            page_no: 1,
            messageList: [],
            search: '',
            currentUserDetails: {
                UserDetails: {
                    profile_picture: ''
                }
            },
            createMsg: {
                text: ''
            },
            intervalMsg: ''
        }
    },
    created() {
        this.otherUserId = this.$route.query.message_id;
        this.myUserId = this.authData.id;
        
        // console.log(this.otherUserId, this.myUserId)
    },
    created(){
        // console.log(this.$route.query.message_id)
        this.to_user_id = this.$route.query.message_id*1;
    },
    mounted() {
        if(this.$route.query.message_id == undefined) {
            this.getUserList(TOKEN);
        } else {
            this.chatMessage(this.from_user_id, this.to_user_id, this.page_no);

            this.getInterValMsg();
        }

    },
    destroyed(){
        clearInterval(this.intervalMsg)
    },
    methods: {
        changeUser(userId){
            this.$router.push({ path: 'message', query: { message_id: userId }})

            this.page_no = 1;

            this.getInterValMsg();


            this.to_user_id = userId*1;
            this.chatMessage(this.from_user_id, this.to_user_id, this.page_no);
        },
        chatMessage(f_user, t_user, page_no){
            this.msgLoad = true;
            HTTP.post(`chat/chat-message?api_token=${TOKEN}`, {from_user_id: f_user, to_user_id: t_user, page_no: page_no})
                .then(response => {
                    console.log(response.data);

                    let chatData = response.data.chat_messsage_data.all_msg_list;
                    let arrObjChatData = Object.values(chatData);

                    this.messageList = arrObjChatData;

                    this.getUserList(TOKEN);


                   setTimeout(() => {
                    var div = $("#msgArea");
                    div.scrollTop(div.prop('scrollHeight'));
                   }, 1000)

                    this.msgLoad = false;
                })
                .catch(e => {
                    console.log(e);
                    // alert('Something went wrong!');
                })
        },
        getUserList(token) {
            this.leftLoad = true;
            HTTP.get(`chat/get-chat-user-list?api_token=${token}`)
                .then(response => {
                    console.log(response.data);
                    let data = response.data;
                    this.leftUserList = data.chat_users;

                    if (this.$route.query.message_id != undefined ){
                        let currentUserDetails = this.leftUserList.filter(m => m.to_user_id == this.$route.query.message_id)
                        this.currentUserDetails = currentUserDetails[0];
                        // console.log(this.currentUserDetails)

                        var that = this;
                        setTimeout(() => {
                            $('.msgUserItem').removeClass('sl');
                            $(`#cUser-${that.$route.query.message_id}`).addClass('sl');
                        }, 500)
                    }


                    this.leftLoad = false;
                })
                .catch(e => {
                    console.log(e);
                    // alert('Something went wrong!');
                })
        },
        sendMessage() {
            // console.log(this.createMsg)

            let msgData = {
                from_user_id: this.from_user_id,
                to_user_id: this.to_user_id,
                message: this.createMsg.text,
                type: 'T'
            }

            HTTP.post(`chat/send-message?api_token=${TOKEN}`, msgData)
                .then(response => {
                    console.log(response.data);

                    if(response.data.has_error == 0){
                        this.createMsg.text = '';

                        this.messageList.push(response.data.chat_messsage_data.chat_msg_arr[0])


                        setTimeout(() => {
                            var div = $("#msgArea");
                            div.scrollTop(div.prop('scrollHeight'));
                        }, 200)
                    }
                })
                .catch(e => {
                    console.log(e);
                    alert('Something went wrong!');
                })
        },
        sendFileMessage($event) {
            // let msgData = {
            //     from_user_id: this.from_user_id,
            //     to_user_id: this.to_user_id,
            //     message: this.createMsg.text,
            //     type: 'T'
            // }

            var formData = new FormData();
            let file = $event.target.files[0];

            formData.append("attachFile", file);
            formData.append("from_user_id", this.from_user_id);
            formData.append("to_user_id", this.to_user_id);



            HTTP.post(`chat/upload-chatfile?api_token=${TOKEN}`, formData)
                .then(response => {
                    // console.log(response.data);

                    if(response.data.has_error == 0){
                        this.createMsg.text = '';

                        this.messageList.push(response.data.chat_messsage_data.chat_msg_arr[0])


                        setTimeout(() => {
                            var div = $("#msgArea");
                            div.scrollTop(div.prop('scrollHeight'));
                        }, 200)
                    }
                })
                .catch(e => {
                    console.log(e);
                    alert('Something went wrong!');
                })
        },
        loadMsg(){
            HTTP.post(`chat/load-unread-messages?api_token=${TOKEN}`, {current_open_user_id: this.to_user_id})
                .then(response => {
                    console.log(response.data);
                    if(response.data.has_error == 0) {
                        // this.messageList.push(response.data.chat_messsage_data.chat_msg_arr[0])
                        response.data.chat_messsage_data.chat_msg_arr.map((m) => {
                            this.messageList.push(m)
                        })

                        setTimeout(() => {
                            var div = $("#msgArea");
                            div.scrollTop(div.prop('scrollHeight'));
                        }, 200)
                    }
                })
                .catch(e => {
                    console.log(e);
                    // alert('Something went wrong!');
                })
        },
        getInterValMsg(){
            let that = this;
            this.intervalMsg = setInterval(function(){
                that.loadMsg()
            }, that.chatInterval);
        },
        nextPrev(f_user, t_user, page_no){
            HTTP.post(`chat/chat-message?api_token=${TOKEN}`, {from_user_id: f_user, to_user_id: t_user, page_no: page_no})
                .then(response => {
                    // console.log(response.data);

                    let chatData = response.data.chat_messsage_data.all_msg_list;
                    let arrObjChatData = Object.values(chatData);

                    arrObjChatData.map((m) => {
                        this.messageList.unshift(m);
                    });
                })
                .catch(e => {
                    console.log(e);
                    // alert('Something went wrong!');
                })
        },
        scrollUp() {
            var elmnt = document.getElementById("msgArea");
            var y = elmnt.scrollTop;
            console.log("Vertically: " + y + "px")

            if(y == 0 ){
                this.page_no = this.page_no + 1;

                this.nextPrev(this.from_user_id, this.to_user_id, this.page_no);
            }
        },
        insert(emoji) {
            this.createMsg.text += emoji
        }

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
