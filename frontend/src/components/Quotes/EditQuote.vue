<template>
    <div>
        <b-container>
            <b-row>
                <b-col>
                    <h3 class="theysa-shadow">Update Quote</h3>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form id="form">
                        <!-- Fields -->
                        <div v-for="(phrase, index) in quote.quote.phrases" :key="phrase.key" :id="`p-${index+1}`">
                            <p :id="`phrase-${index+1}`" style="margin-top: 5px;"><b>Phrase {{ index+1 }}</b> </p>
                            <b-form-input 
                            placeholder="Context"
                            type="text"
                            size="lg"
                            :id="`ctx-${index+1}`"
                            :value=phrase.ctx
                            />
                            <b-form-input 
                            placeholder="By"
                            type="text"
                            size="lg"
                            :id="`by-${index+1}`"
                            :value=phrase.by
                            />
                            <b-form-input 
                            placeholder="Message"
                            type="text"
                            size="lg"
                            :id="`msg-${index+1}`"
                            :value=phrase.msg
                            required
                            />
                        </div>
                    </b-form>
                </b-col>
            </b-row>

            <!-- Error Message when adding a phrase-->
            <b-row>
                <b-col>
                    <b-form-invalid-feedback :state="NotAddError"> You should write at least a message before adding a new quote</b-form-invalid-feedback>
                </b-col>
            </b-row>

            <!-- Error Message when removing a phrase-->
            <b-row>
                <b-col>
                    <b-form-invalid-feedback :state="NotRemoveError"> You should at least add another phrase before removing it </b-form-invalid-feedback>
                </b-col>
            </b-row>


            <!-- Add and Remove Fields options -->
            <b-row>
                <b-col >
                    <b-icon-clipboard-plus style="margin-top:5px; float:right;" v-on:click="AddFields()"></b-icon-clipboard-plus>
                </b-col>

                <b-col>
                    <b-icon-clipboard-minus style="margin-top:5px;" v-on:click="RemoveFields()"></b-icon-clipboard-minus>
                </b-col>
            </b-row>    

            <!-- General context field -->
            <b-row>
                <b-col>
                    <b-form-input 
                    placeholder="General Context" 
                    type="text"
                    id="general_ctx" 
                    size="lg"
                    :value=quote.quote.ctx
                    required
                    />
                </b-col>
            </b-row>

            <!-- Datepicker -->
            <b-row align-h="center">
                <b-col align="center">
                    <b-form-datepicker
                    id="datepicker"
                    v-model="date"
                    size="lg"
                    class="w-50"
                    :label-no-date-selected="date"
                    />
                </b-col>
            </b-row>

            <!-- Submit button-->
            <b-row >
                <b-col align="center">
                    <input 
                    class="theysa-button theysa-shadow inputButton" 
                    type="submit" @click="AddEditQuote(board_path, count, 'Edit', quote.id, date)"
                    value="SUBMIT" 
                    />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { AddEditQuote, AddPhrase } from './Quotes'
import { convert_time_toISO } from '../User/user'

export default {
    name: 'EditQuote',
    props: {
        board_path: {
            type: String,
            default: ''
        },
        quote: {
            type: Object
        }
    },
    data() {
        let count
        let NotAddError
        let NotRemoveError
        let date
        return {
            count,
            date,
            NotAddError,
            NotRemoveError,
            AddEditQuote,
            AddPhrase,
            convert_time_toISO
        }
    },
    methods: {
        get_phrase_id(index) {
            return `phrase-${index}`
        },
        AddFields() {
            if(document.getElementById(`msg-${this.count}`).value != "") {
                this.NotAddError = null
                this.NotRemoveError = null
                document.getElementById(`msg-${this.count}`).classList.remove("is-invalid")
                this.count = this.count + 1
                AddPhrase(this.count)
            }
            else {
                this.NotAddError = false
                document.getElementById(`msg-${this.count}`).classList.add("is-invalid")
            }
        },
        RemoveFields() {
            if(this.count > 1) {
                this.NotAddError = null
                this.NotRemoveError = null
                let form = document.getElementById("form")  // Form where the fields will be removed
                let phrase = document.getElementById(`phrase-${this.count}`)
                form.removeChild(phrase)
                this.count = this.count - 1
            }
            else {
                this.NotRemoveError = false
            }
        },
        setDate() {
            if(this.quote.quote.date != undefined) {
                this.date = this.quote.quote.date
                this.date = convert_time_toISO(this.date)
            }
        }
    },
    created() {
        this.count = this.quote.quote.phrases.length
        this.setDate()
    }
}
</script>