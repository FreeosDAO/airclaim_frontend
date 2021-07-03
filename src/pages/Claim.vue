<template>
<div class="text-center relative">

    <q-dialog v-model="registerModalTrigger">
        <q-card style="max-width: 440px;" class="q-pa-lg">
            <q-card-actions class="q-pa-none" align="right">
                <q-icon  class="q-ma-none cursor-pointer" style="font-size:2rem" name="close" v-close-popup />
           </q-card-actions>
            <div class="flex justify-center text-center q-mt-md" style="width: 80px; height: 80px; margin: -25px auto 0;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 84" class="freeos-logo-icon inline-block fill-current text-primary header-logoicon">
                    <path fill="#00a1ed" d="M41.7 0C18.7 0 0 18.7 0 41.7c0 23 18.7 41.7 41.7 41.7 23 0 41.7-18.7 41.7-41.7C83.4 18.7 64.8 0 41.7 0zM26.9 68.6c-2.7 0-5.3-1-7.3-2.8-13.3-12.2-14.2-32.9-2-46.3C23.8 12.8 32.6 9 41.7 9c1.7 0 3.4.1 5.1.4h.2c-5.6 2.3-9.7 7.5-10.6 13.5-.1.6-.2 1.3-.2 1.9V26c-.1 4.1.1 8.2.6 12.3l-10.6 3.9c-.7.3-1.1 1.1-.8 1.8l.5 1.2c1.4 4 5.8 6 9.8 4.6.4-.2.9-.4 1.3-.6l1-.6.3-.2v.4c.2 3 .1 6-.2 9H38c0 .3 0 .6-.1 1-.1.6-.2 1.2-.4 1.8-1.4 4.8-5.7 8-10.6 8zm14.8 5.9c-1.8 0-3.7-.2-5.5-.5 6-2.5 10.1-8 10.8-14.5.7-5.4.7-10.9-.1-16.3l10.8-6.4c1.2-.7 1.7-2.2 1.2-3.5l-.1-.3c-.5-1.4-2-2.1-3.4-1.6L45.9 35l-.2.1V35c-.4-2.8-.5-5.7-.4-8.5.4-8.3 5.3-11.7 11.3-11.6 2.5.1 4.8.9 6.8 2.4.5.4.9.8 1.4 1.3 12.8 12.6 12.9 33.3.2 46.2-6.2 6.2-14.5 9.7-23.3 9.7z"></path>
                </svg>
            </div>
            <q-card-section class="q-mt-none text-center">
                <div class="text-h4">Register Your Interest</div>
            </q-card-section>

            <q-card-section class="q-pt-none text-center">
                <p class="text-body1">Before you start, we need to register your
                    interest in the Freeos AirClaim.
                    It’s just a press of a button.</p>

                <p class="text-body2">By connecting you accept Freeos’s <a class="cursor-pointer" style="text-decoration:underline" @click="toggleTerms()">Terms of Service</a></p>
                <div v-show="showTerms" class="" style="width:100%;max-height:120px;overflow-y: auto;" class="text-left">
                    <p class="text-body1"><strong>Freeos Terms of Service</strong></p>
                    <p class="text-body2">Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum </p>
                    <p class="text-body2">Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum </p>
                    <p class="text-body2">Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum </p>
                    <p class="text-body2">Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum </p>
                </div>
            </q-card-section>

            <q-card-actions align="center">
                <q-btn unelevated size="lg" class="q-mb-m" outline color="primary" @click="registerUser()">Register</q-btn>
            </q-card-actions>
        </q-card>
    </q-dialog>

    <CompleteDialog  ref="complete"  />
    <div class="add-bg">
        <div v-if="!isFreeosEnabled">
            <b>Freeos system is not currently operational. Please check back later.</b>
        </div>

            <div class="panel-wrap panel-top-total q-pt-lg" v-if="isFreeosEnabled">
                <div class="row">
                    <div class="col">
                        <p class="text-subtitle1 q-mb-xs" style="line-height:1;"><strong>OPTIONS</strong></p>
                        <p class="text-bold text-h4" style="line-height:1;letter-spacing:-2px;">{{liquidOptions}}</p>
                    </div>
                    <div class="col" style="max-width:40px;">
                        <router-link class="convert-btn" v-if="liquidOptions > 0" to="/convert-options">
                            <small>Convert</small>
                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                                    <path d="M14,12.6H1.5c-0.4,0-0.7-0.3-0.7-0.7c0-0.4,0.3-0.7,0.7-0.7H14c0.4,0,0.7,0.3,0.7,0.7C14.7,12.3,14.4,12.6,14,12.6z" />
                                    <path d="M10.6,16c-0.2,0-0.3-0.1-0.5-0.2c-0.3-0.3-0.3-0.7,0-0.9l3-3l-3-3c-0.3-0.3-0.3-0.7,0-0.9c0.3-0.3,0.7-0.3,0.9,0l3.5,3.5
                                    c0.3,0.3,0.3,0.7,0,0.9L11,15.9C10.9,16,10.7,16,10.6,16z" />
                                    <path d="M13.2,21.5c-4,0-7.4-2.4-8.9-6.1c-0.1-0.3,0-0.7,0.4-0.8c0.3-0.1,0.7,0,0.8,0.4c1.3,3.2,4.3,5.2,7.7,5.2
                                    c4.5,0,8.3-3.7,8.3-8.3s-3.7-8.3-8.3-8.3c-3.4,0-6.4,2.1-7.7,5.2C5.4,9.2,5,9.4,4.7,9.3C4.3,9.1,4.2,8.8,4.3,8.4
                                    c1.4-3.7,4.9-6.1,8.9-6.1c5.3,0,9.6,4.3,9.6,9.6S18.5,21.5,13.2,21.5z" />
                                </svg>                        
                        </router-link></div>
                    <div class="col">
                        <p class="text-subtitle1 q-mb-xs" style="line-height:1;"><strong>{{currencyName}}</strong></p>
                        <p class="text-bold text-h4" style="line-height:1;letter-spacing:-2px;">{{liquidFreeos}}</p>
                    </div>
                </div>
            </div>

        <div class="add-bg-white" v-if="isFreeosEnabled">
            <div class="flex justify-between add-custome-width">

                <div class="flex column text-left"  style="flex:1">
                    <div class="text-subtitle1">Iteration</div>
                    <div style="background: none; border: none; outline: none;  padding-right: 0; text-align: left;line-height:1;" class="text-subtitle1 text-capitalize">
                            <strong>{{notes}}</strong>
                    </div>
                </div>


                <div class="wrap-avatar">
                    <div class="avatar claim-btn" @click="startClaim()" v-bind:class="{'disable-btn': !canClaim}">
                        <q-icon size="md" style="margin-top: -50px; margin-bottom: 15px;" v-bind:class="{'hide': canClaim}">
                            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                                <g>
                                    <g>
                                        <path fill="#ffffff" d="M501.362,383.95L320.497,51.474c-29.059-48.921-99.896-48.986-128.994,0L10.647,383.95
                      c-29.706,49.989,6.259,113.291,64.482,113.291h361.736C495.039,497.241,531.068,433.99,501.362,383.95z M256,437.241
                      c-16.538,0-30-13.462-30-30c0-16.538,13.462-30,30-30c16.538,0,30,13.462,30,30C286,423.779,272.538,437.241,256,437.241z
                      M286,317.241c0,16.538-13.462,30-30,30c-16.538,0-30-13.462-30-30v-150c0-16.538,13.462-30,30-30c16.538,0,30,13.462,30,30
                      V317.241z" />
                                    </g>
                                </g>
                            </svg>
                        </q-icon>
                        <svg style="position: absolute;width: 130px;height: 130px;top:50%;left:50%;transform:translate(-50%,-50%)" version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" overflow="visible" xml:space="preserve">
  <path style="opacity:.1" class="st0" d="M50.5,15.6c-19.2,0-34.8,15.6-34.8,34.8s15.6,34.8,34.8,34.8s34.8-15.6,34.8-34.8S69.8,15.6,50.5,15.6z
	 M38.2,72.9c-2.4,0-4.5-0.9-6.1-2.3l0,0c-4.3-4-7.4-9.4-8.5-15.4c-0.3-1.5-0.4-3.1-0.4-4.7c0-15.1,12.2-27.3,27.3-27.3
	c1.5,0,2.9,0.1,4.3,0.3h0.1c-4.7,2.1-8,6-8.8,11.3l0,0l0,0c-0.1,0.5-0.1,1-0.1,1.5l0,0c0,0,0,0.1,0,0.3c0,0.1,0,0.1,0,0.2
	c0,0.2,0,0.3,0,0.5l0,0c-0.1,2.3-0.1,5.9,0.5,10.3l-8.8,3.2c-0.6,0.2-0.9,0.9-0.7,1.5l0.4,1c1.4,3.8,5.8,5.3,9.3,3.3l0.8-0.5
	l0.2-0.1v0.3c0.2,3.3,0,5.9-0.2,7.5h-0.1c0,0.3,0,0.5-0.1,0.8C47.2,65.5,47,66,47,66.1C45.9,70.1,42.4,72.9,38.2,72.9z M50.5,77.8
	c-1.6,0-3.1-0.1-4.6-0.4l0,0l0,0c4.9-2.2,8.4-6.4,9-12.1c0.3-2.1,0.8-7.4-0.1-13.6l9-5.4c1-0.6,1.4-1.8,1-2.9l-0.1-0.2
	c-0.4-1.2-1.7-1.7-2.9-1.3l-8,2.9h-0.1v-0.1c-0.4-3.7-0.4-6.1-0.3-7.1l0,0c0.3-6.9,4.4-9.8,9.4-9.7c2.1,0,4.1,0.8,5.7,2
	c0.4,0.3,0.8,0.7,1.1,1.1c4.1,4,6.9,9.4,7.8,15.3c0.2,1.3,0.3,2.7,0.3,4.1C77.9,65.5,65.6,77.8,50.5,77.8z"/>
<g>
	<path class="st0" d="M12.9,49.6c0-5.2,3.9-8.6,8.8-8.6c3.9,0,5.9,2,7.2,4.1l-3.1,1.5c-0.7-1.3-2.2-2.4-4.1-2.4
		c-2.9,0-5.1,2.3-5.1,5.5s2.2,5.5,5.1,5.5c1.9,0,3.3-1.1,4.1-2.4l3.1,1.4c-1.2,2.1-3.3,4.1-7.2,4.1C16.9,58.2,12.9,54.7,12.9,49.6z"
		/>
	<path class="st0" d="M31,41.2h3.5v13.5h7v3.1H31C31,57.9,31,41.2,31,41.2z"/>
	<path class="st0" d="M54.6,55h-7.5l-1.1,2.9h-3.9l6.5-16.7h4.4l6.4,16.7h-3.9L54.6,55z M48.1,51.9h5.5l-2.8-7.7L48.1,51.9z"/>
	<path class="st0" d="M61.1,41.2h3.5V58h-3.5V41.2z"/>
	<path class="st0" d="M82.5,45.9l-4.7,12h-1.5l-4.6-12v12h-3.5V41.2h5l4.1,10.5l4.1-10.5h5V58h-3.6C82.5,58,82.5,45.9,82.5,45.9z"/>
</g>
<g>
	<path class="st0" d="M23.8,67.6l-2.6-3.9h1.3l1.8,2.9l1.8-2.9h1.3L25,67.6v2.8h-1.2V67.6z"/>
	<path class="st0" d="M26.7,67.9c0-1.4,0.9-2.5,2.5-2.5c1.5,0,2.5,1.1,2.5,2.5s-0.9,2.5-2.5,2.5C27.7,70.4,26.7,69.3,26.7,67.9z
		 M30.6,67.9c0-0.8-0.5-1.6-1.4-1.6s-1.4,0.7-1.4,1.6s0.5,1.6,1.4,1.6S30.6,68.8,30.6,67.9z"/>
	<path class="st0" d="M36,69.7c-0.4,0.4-0.9,0.8-1.7,0.8c-1,0-1.5-0.5-1.5-1.5v-3.4h1v3c0,0.7,0.4,1,1,1c0.5,0,1-0.3,1.2-0.6v-3.4h1
		v4.8h-1V69.7z"/>
	<path class="st0" d="M38.4,65.5h1v0.7c0.4-0.5,0.9-0.8,1.6-0.8v1c-0.1,0-0.2,0-0.3,0c-0.4,0-1,0.3-1.2,0.6v3.3h-1L38.4,65.5
		L38.4,65.5z"/>
	<path class="st0" d="M44.5,63.7h4.6v1h-3.4v1.7H49v1h-3.3v2.9h-1.2V63.7z"/>
	<path class="st0" d="M52.5,67.8h-1.2v2.5h-1.2v-6.7H53c1.3,0,2.2,0.9,2.2,2.1s-0.8,1.8-1.6,2l1.6,2.6h-1.3L52.5,67.8z M52.9,64.7
		h-1.6v2.1h1.6c0.7,0,1.1-0.4,1.1-1.1S53.6,64.7,52.9,64.7z"/>
	<path class="st0" d="M56.4,63.7H61v1h-3.4v1.7h3.3v1h-3.3v1.8H61v1h-4.6V63.7z"/>
	<path class="st0" d="M62.2,63.7h4.6v1h-3.4v1.7h3.3v1h-3.3v1.8h3.4v1h-4.6C62.2,70.2,62.2,63.7,62.2,63.7z"/>
	<path class="st0" d="M71.1,63.5c2,0,3.4,1.5,3.4,3.4s-1.4,3.4-3.4,3.4S67.6,69,67.6,67S69.1,63.5,71.1,63.5z M71.1,64.6
		c-1.3,0-2.2,1-2.2,2.4s0.9,2.4,2.2,2.4c1.3,0,2.2-1,2.2-2.4C73.3,65.6,72.4,64.6,71.1,64.6z"/>
	<path class="st0" d="M75.8,68.5c0.5,0.5,1.2,0.9,2.1,0.9c1,0,1.3-0.5,1.3-0.9c0-0.6-0.7-0.8-1.5-1c-1.1-0.3-2.4-0.6-2.4-2
		c0-1.1,1-1.9,2.4-1.9c1,0,1.9,0.3,2.5,0.9l-0.7,0.9c-0.5-0.5-1.2-0.8-1.9-0.8c-0.7,0-1.1,0.3-1.1,0.8s0.7,0.7,1.5,0.9
		c1.1,0.3,2.4,0.6,2.4,2.1c0,1.1-0.8,2.1-2.6,2.1c-1.2,0-2.1-0.4-2.7-1.1L75.8,68.5z"/>
	<path class="st0" d="M33.4,75.5c2,0,3.4,1.5,3.4,3.4s-1.4,3.4-3.4,3.4S30,81,30,79S31.4,75.5,33.4,75.5z M33.4,76.6
		c-1.3,0-2.2,1-2.2,2.4s0.9,2.4,2.2,2.4s2.2-1,2.2-2.4C35.6,77.6,34.7,76.6,33.4,76.6z"/>
	<path class="st0" d="M37.9,75.7h2.9c1.4,0,2.2,1,2.2,2.1s-0.8,2.1-2.2,2.1H39v2.5h-1.2L37.9,75.7L37.9,75.7z M40.7,76.7h-1.6v2.1
		h1.6c0.7,0,1.1-0.4,1.1-1.1S41.4,76.7,40.7,76.7z"/>
	<path class="st0" d="M45.6,76.7h-2v-1h5.2v1h-2v5.6h-1.2V76.7z"/>
	<path class="st0" d="M49.8,75.7H51v6.7h-1.2V75.7z"/>
	<path class="st0" d="M55.5,75.5c2,0,3.4,1.5,3.4,3.4s-1.4,3.4-3.4,3.4S52.1,81,52.1,79S53.5,75.5,55.5,75.5z M55.5,76.6
		c-1.3,0-2.2,1-2.2,2.4s0.9,2.4,2.2,2.4s2.2-1,2.2-2.4S56.8,76.6,55.5,76.6z"/>
	<path class="st0" d="M61.2,77.5v4.9H60v-6.7h1.2l3.4,4.7v-4.7h1.2v6.7h-1.1L61.2,77.5z"/>
	<path class="st0" d="M67.5,80.5c0.5,0.5,1.2,0.9,2.1,0.9c1,0,1.3-0.5,1.3-0.9c0-0.6-0.7-0.8-1.5-1c-1.1-0.3-2.4-0.6-2.4-2
		c0-1.1,1-1.9,2.4-1.9c1,0,1.9,0.3,2.5,0.9l-0.7,0.9c-0.5-0.5-1.2-0.8-1.9-0.8c-0.7,0-1.1,0.3-1.1,0.8s0.7,0.7,1.5,0.9
		c1.1,0.3,2.4,0.6,2.4,2.1c0,1.1-0.8,2.1-2.6,2.1c-1.2,0-2.1-0.4-2.7-1.1L67.5,80.5z"/>
</g>
                        </svg>

                    </div>

                </div>

                <div class="flex column text-right"  style="flex:1">
                    <div class="text-subtitle1">Next Claim</div>
                    <div style="background: none; border: none; outline: none;  padding-right: 0; text-align: right;line-height:1;" class="text-subtitle1">
                            <strong>{{nextClaimDescription}}</strong>
                    </div>
                </div>
            </div>

            <div class="flex justify-center text-center" style="align-items:center;height:80px;margin-top:-5px;">
                <div class="text-h6" style="line-height:1.3" v-if="canClaim">
                    <a class="text-primary" style="cursor:pointer;text-decoration:underline" @click="startClaim()" v-if="canClaim">Claim now</a> to claim your weekly OPTIONS
                </div>
                <div v-if="!canClaim" v-html="reasonCannotClaim">
                </div>
                <div class="flex"><small class="q-mr-auto">For more info on Claiming <router-link to="/info#claiming">click here</router-link></small></div>
            </div>

        </div>
    </div>

    <div v-if="isFreeosEnabled">
        <!-- <balance class="col-xs-12 col-md-5 row text-left" /> -->
        <balance />
    </div>
    <div style="width: 300px; margin: 0 auto;" v-if="false">
        <q-btn class="add-hover q-mt-sm q-mb-md" style="width: 300px; height: 40px; border: 2px solid #00a1ed; border-radius: 8px; color: #00a1ed; width: 100%;">Invite friends and family</q-btn>
    </div>

    <div class="box" v-if="false">
        <div class="flex justify-end q-pr-md q-mt-lg">
            <q-icon class="cursor-pointer text-h5" name="close" />
        </div>
        <div class="flex column justify-center q-mx-auto items-center">
            <div class="q-mt-md" style="width: 50px; height: 50px;">
                <!-- Envelop---Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" width="80.846" height="51.005" viewBox="0 0 80.846 51.005">
                    <g id="Group_25" data-name="Group 25" transform="translate(-766.538 -268.64)">
                        <path id="Path_34" data-name="Path 34" d="M846.384,319.645H767.538a1,1,0,0,1-1-1v-49a1,1,0,0,1,1-1h78.846a1,1,0,0,1,1,1v49A1,1,0,0,1,846.384,319.645Zm-77.846-2h76.846v-47H768.538Z" fill="#00aced" />
                        <path id="Path_35" data-name="Path 35" d="M806.961,295.143a1,1,0,0,1-.527-.151l-39.424-24.5a1,1,0,0,1,1.056-1.7l38.9,24.173,38.9-24.173a1,1,0,0,1,1.056,1.7l-39.423,24.5A1,1,0,0,1,806.961,295.143Z" fill="#00aced" />
                    </g>
                </svg>
            </div>
            <div class="q-mb-lg q-mt-lg">
                Hi Jerome, we’ve noticed you <br /> haven’t signed up for <br /> notifcations. Signup to <br /> get notified of claims.
            </div>
            <div class="flex justify-between items-basline q-pb-md">
                <div class="add-input flex justify-between" style="width: 200px; margin-right: 20px; height: 35px;">
                    <input placeholder="Email" />
                </div>
                <span class="curve-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="59.438" height="59.439" viewBox="0 0 59.438 59.439">
                        <g id="Group_31" data-name="Group 31" transform="translate(-777.242 -556.374)">
                            <g id="Group_29" data-name="Group 29">
                                <circle id="Ellipse_3" data-name="Ellipse 3" cx="28.719" cy="28.719" r="28.719" transform="translate(778.242 557.374)" fill="#fff" />
                                <path id="Path_39" data-name="Path 39" d="M806.961,615.813a29.719,29.719,0,1,1,29.719-29.72A29.754,29.754,0,0,1,806.961,615.813Zm0-57.439a27.719,27.719,0,1,0,27.719,27.719A27.751,27.751,0,0,0,806.961,558.374Z" fill="#00aced" />
                            </g>
                            <g id="Group_30" data-name="Group 30">
                                <path id="Path_40" data-name="Path 40" d="M789.223,593.7l7.748-7.748h25.194" fill="#fff" />
                                <path id="Path_41" data-name="Path 41" d="M789.223,594.7a1,1,0,0,1-.707-1.707l7.748-7.748a1,1,0,0,1,.707-.293h25.2a1,1,0,0,1,0,2H797.385L789.93,594.4A.993.993,0,0,1,789.223,594.7Z" fill="#00aced" />
                            </g>
                            <path id="Path_42" data-name="Path 42" d="M815.936,595.507a1,1,0,0,1-.707-1.707l7.758-7.758-7.654-7.655a1,1,0,0,1,1.414-1.414l8.361,8.362a1,1,0,0,1,0,1.414l-8.465,8.465A1,1,0,0,1,815.936,595.507Z" fill="#00aced" />
                        </g>
                    </svg>
                </span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapState,
    mapActions,
    mapGetters
} from 'vuex'
import {
    FreeosBlockChainState
} from '../services/FreeosBlockChainState'
import Balance from 'components/accountManagement/Balance'
import CompleteDialog from 'src/components/CompleteDialog.vue'

export default {
    name: 'Claim',
    data() {
        return {
            showCompleteDialog: false,
            dialogTitle: "WAHOO!", 
            dialogSubtitle: null, 
            dialogValue: null,
            dialogCurrency: process.env.CURRENCY_NAME + ' OPTIONS', 
            stakeCurrency: process.env.STAKING_CURRENCY,
            currencyName: process.env.CURRENCY_NAME,
            registerModalOverride: true,
            showTerms: false, 
            claimWatch: null,
        }
    },
    components: {
        Balance,
        CompleteDialog
    },
    computed: {
        ...mapGetters('freeos', ['isRegistered', 'isFreeosEnabled', 'totalFreeos', 'liquidFreeos', 'liquidOptions', 'canClaim', 'reasonCannotClaim', 'currentIteration']),
        nextClaimDescription: function () {
            const dateEnd = new Date(`${this.currentIteration.end}Z`) // Z = zero UTC offset
            const currentTimeStamp = Date.now()
            return this.secondsToDhms((dateEnd - currentTimeStamp) / 1e3);
        },
        notes: function () {
            return this.currentIteration ? ('Week ' + this.currentIteration.iteration_number) : ''
        },
        registerModalTrigger: {
            get () {
                return (this.isRegistered === false && this.registerModalOverride === true)
            },
            set (value) {
                console.log(value);
                this.registerModalOverride = value;
                if(!this.isRegistered){
                    console.log("LOGOUT");
                    this.logout();
                }
            }
        },
    },
    methods: {
        ...mapActions('freeos', ['monitorBlockChain', 'fetch', 'register', 'claim', 'currentIteration']),
        ...mapActions('account', ['logout']),
        toggleTerms(){
            this.showTerms = !this.showTerms;
        },
        async registerUser() {
            await this.register()
            //await this.fetch()
        },
        async startClaim() {
            const _ = this;
            var result = await _.claim()
            //this.claimWatch = vm.$watch('liquidFreeos', function(newValue, oldValue) {
            //alert('The first name was changed from ' + oldValue.firstName + ' to ' + newValue.firstName + '!');
            //if(newValue > oldValue){
            //_.claimWatch();
            this.$refs.complete.openDialog({
                  title: "Wahoo!", subtitle: "You earned", value: this.currentIteration.claim_amount
            });
            console.log('claim', result)
        },
        secondsToDhms(seconds) {
            const d = Math.floor(seconds / (3600 * 24));
            const h = Math.floor(seconds % (3600 * 24) / 3600);
            const m = Math.floor(seconds % 3600 / 60);

            const dDisplay = d ? `${d} d` : "";
            const hDisplay = h ? `${h} h` : "";
            const mDisplay = m ? `${m} min${m !== 1 ? "s" : ""}` : "";

            let timeToNextClaim = "";
            if(dDisplay) timeToNextClaim = dDisplay;
            if(hDisplay) timeToNextClaim = timeToNextClaim + (dDisplay ? ", " : "") + hDisplay;
            if(mDisplay && !dDisplay) timeToNextClaim = timeToNextClaim + (hDisplay ? ", " : "") + mDisplay;
            return timeToNextClaim;
        }


    },
    async created () {

    },
    async mounted() {
        document.body.classList.add('claim-page');
        var result = await this.fetch();
        console.log('awaitresult', result);
    },
    destroyed () {
        document.body.classList.remove('claim-page')
    }
}
</script>

<style lang="scss">

$panel-border-radius: 8px;
$panel-width: 360px;

.convert-btn{
    text-decoration: none;
    opacity: .5;
    color:#000;
    line-height:1;
    small{
        margin-bottom:0;
        display: block;
    }
    &:hover{
        opacity:1;
    }
}

.claim-btn{
    cursor:pointer;
    .st0{fill:#FFFFFF;}
}

.add-bg {
    position: relative;
    padding: 10px 0;

    &:after {
        content: "";
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        pointer-events: none;
        background: url('../assets/bluebg.svg') bottom center no-repeat;
        background-size: 4096px;
    }

    .add-blue-bg {
        position: absolute;
        top: -40px;
        left: 0;
        right: 0;
        width: 100%;

    }

    .add-blue-bg-clip {
        position: relative;
        width: 100%;
    }

    .add-blue-bg>svg {
        position: absolute;
        top: 0%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 5000px;
        clip: rect(0px, 5000px, 520px, 0px);

    }

    .add-bg-white {
        position: relative;
        z-index: 2000;
        margin: 20px auto 0;
        max-width: $panel-width;
        width:100%;
        height: 150px;
        background: #fff;
        border-radius: 8px;
        padding: 10px 20px;

        .custome-width {
            flex-direction: row;
        }

        .wrap-avatar {
            border: 5px solid #fff;
            position: relative;
            background-color: #cccccc;
            margin: -4.5rem -10px 0;
            /* margin-left:  35px; */
            opacity: .9;
            width: 8rem;
            height: 8rem;
            /* width: inherit; */
            /* height: inherit; */
            border-radius: 100%;

            .behind-bg {
                position: absolute;
                top: 20px;
                left: 13px;
                bottom: 0;
                right: 0;
                background-image: url("../assets/freeos.svg");
                width: 70px;
                height: 70px;
                z-index: -1;
            }

            .disable-btn.avatar:before {
                background-color: #cccccc;
                opacity: .8;
            }

            .avatar {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                color: #fff;
                position: relative;

                &::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    background-color: var(--q-color-primary);
                    border-radius: 100%;
                }

            }
        }

    }
}

.add-hover:hover {
    color: #fff !important;
    border: none !important;
    background-color: #f7931e;
    transition: .3s all ease-in-out;
}

.wrapper-box {
    position: relative;
    z-index: 1000;
}

.box {
    position: absolute;
    right: 20px;
    top: 60px;
    z-index: 2000;
    box-shadow:
        0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048),
        0 12.5px 10px rgba(0, 0, 0, 0.06),
        0 22.3px 17.9px rgba(0, 0, 0, 0.072),
        0 41.8px 33.4px rgba(0, 0, 0, 0.086),
        0 100px 80px rgba(0, 0, 0, 0.12);
    width: 300px;
    border-radius: 8px;
}

.add-input {
    border-left: 2px solid #00a1ed;
    border-bottom: 2px solid #00a1ed;
    margin-bottom: 20px;

    input {
        border: none;
        outline: none;
        padding-left: 10px;
        font-size: 13px;
    }
}

.curve-arrow {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;

    img {
        width: 20px;
        height: 20px;
    }
}

// remove the bg on hover
.q-focus-helper {
    display: none;
}

/* remove padding-right */
/* .q-btn__wrapper {
  padding-right: 0;
} */

.q-ripple {
    display: none;
}
</style>
