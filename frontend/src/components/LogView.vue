<template>
  <div class="log" style="margin-top:50px;">
    <!--<h1>LOG</h1>-->

    <div style="border:2px dotted gray;
                display:flex;
                padding: 40px;
                border-radius: 30px;
                margin-left: 48px;
                margin-right: 48px;
                margin-bottom: 40px;">

        <div style="float:left;
                    display:flex;
                    text-align: center;">

            <table style="width:auto; height:auto; word-break:break-all; padding:50px; font-family: HallymGothic-Regular;">
                <tr>
                    <td><b>조회 기간&nbsp;&nbsp;</b></td>
                    <td style="text-align:left;">
                        <date-picker
                            v-model="DateRange"
                            type="date"
                            range
                            placeholder="Select date range">
                        </date-picker>
                    </td>
                </tr>
                <tr>
                    <td><b>로그 레벨&nbsp;&nbsp;</b></td>
                    <td style="text-align:left;">
                        <b-form-select
                            id="filter-select"
                            style="height:40px; width:100%;"
                            v-model="LogLevel"
                            @context="onContext"
                            :options="filterOptions"
                        />
                    </td>
                </tr>
                <tr>
                    <td><b>로그 내용&nbsp;&nbsp;</b></td>
                    <td style="text-align:left; ">
                        <b-form-input
                            id="filter-input"
                            v-model="filter"
                            style="height:40px;"
                            type="search"
                            placeholder="Search"
                        ></b-form-input>
                    </td>
                </tr>
            </table>
            <div>
             <b-button
                class="font"
                size="lg"
                style="font-family: HallymGothic-Regular;
                        margin-left: 20px;
                        color : #000000;
                        height:100%;
                        background-color: #00000000;
                        font-weight: bold;"
                :disabled="!DateRange && !LogLevel && !filter"
                @click="DateRange = '', LogLevel='', filter=''"> 초기화
            </b-button>
            </div>


        </div>


    </div>


    <div size="lg" style="margin-bottom:10px;">
        <div style="float:left; margin-left:48px; ">
            <b-button class="font" @click="selectAllRows">전체 선택</b-button>
            <b-button class="font" @click="clearSelected">전체 해제</b-button>
            <b-button class="font" @click="removerow">삭제</b-button>
        </div>
    </div>

    <b-button
        class="font"
        style="float:right;
               margin-right:48px;"
        @click="excelDownFunc">
        Excel Download
    </b-button>

    <br/>

    <b-table
        id="my-table"
        style="text-align:left;
                border-top: 1px solid gainsboro;
                margin-top:25px;
                margin-left:48px;
                margin-right:48px;
                font-size: 15px;
                font-family: HallymGothic-Regular;
                "
        hover large striped fixed show-empty
        :items="filteredItems"
        :fields="fields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filter-included-fields="filterOn"
        @filtered="onFiltered"
        responsive="sm"
        ref="selectableTable"
        selectable
        @row-selected="onRowSelected"
    >
    </b-table>

    <p style="float:left; margin-left:48px; ">
            총 로그 수 : {{filteredItems.length}}개 &nbsp;&nbsp;
            페이지 : <b style="color:#477fd4e1;">{{currentPage}}</b> / {{Math.round(filteredRows/perPage)}}
    </p>

    <br/><br/>

    <div style="font-size:15px;  display:flex; justify-content: center; align-items: center;">
        <p style="font-size:15px;  display:flex;">
            <b-form-select
                style="margin-right:10px;"
                id="per-page-select"
                v-model="perPage"
                :options="pageOptions"
            />
        </p>
        <b-pagination
            v-model="currentPage"
            :total-rows="filteredRows"
            :per-page="perPage"
            aria-controls="my-table"
            align="center"
        >
        </b-pagination>
    </div>


  </div>
</template>

<script>
import item  from "@/model/test.json";
import * as XLSX from "xlsx";
import Vue from 'vue'
import axios from "axios";
import VueAxios from 'vue-axios'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
//var item = axios.get('http://localhost:3000/api/getlog');

Vue.use(VueAxios, axios)


export default {
    components:{DatePicker},
    data() {
        return {
            DateRange:'',
            startDate:'',
            endDate:'',
            filter :'',
            search : '',
            context: null,
            fields : [
                {key : 'LogDate', label:'날짜' , thClass: 'w30', tdClass: 'text-center'},
                {key : 'LogLevel', label:'레벨', thClass: 'w40', tdClass: 'text-center' },
                {key : 'LogCode', label:'코드',  thClass: 'w50', tdClass: 'text-center'},
                {key : 'LogString', label:'내용',  thClass: 'w60'},
            ],
            items:item,
            sortBy: 'LogDate',
            sortDesc: true,
            currentPage: 1,
            perPage: 10,
            filterOn: [],
            selected: [],
            pageOptions: [5, 10, 15, 20 ,{ value: item.length, text: "All" }],
            filterOptions : ["Info", "Warning","Critical", "Debug"],
            LogDate:'',
            LogLevel:'',
        }
    },      // data 끝
    created() {
        var vm = this;
        axios.get('http://localhost:3000/api/getlog')
        .then(function(response){
            //console.log(response);
            vm.items = response.data;
        })
        .catch(function(error){
            console.log(error);
        })
    },
    computed: {
        filteredItems(){
            var result = this.filterItemsByFilter(this.filterItemsByLogLevel(this.filterItemsByDateRange(this.items)));
            return result;
        },
        filteredRows(){
            var result = this.filterItemsByFilter(this.filterItemsByLogLevel(this.filterItemsByDateRange(this.items)));
            var rows = result.length;
            return rows;
        }
    },

    methods: {
        filterItemsByLogLevel: function(items) {
            return items.filter(product => !product.LogLevel.indexOf(this.LogLevel))
        },
        filterItemsByFilter:function(items){
            var word = this.filter;

            if(this.filter!=""){
                return items.filter(item =>
                    item.LogString.includes(word)
                )
            }else{
                return items
            }

        },
        filterItemsByDateRange: function(items) {
            var endDate = new Date(this.DateRange[1])
            var startDate = new Date(this.DateRange[0])
            var tomorrow = new Date(endDate.setDate(endDate.getDate() + 1));
            if(this.DateRange!=""){
                return items.filter(item =>
                     (new Date(item.LogDate).getTime() >=startDate) && (new Date(item.LogDate).getTime() <= tomorrow)
                )
            }else{
                return items
            }
        },
        onRowSelected(items) {
            this.selected = items
            return this.selected
        },
        selectAllRows() {
            this.$refs.selectableTable.selectAllRows()
        },
        clearSelected() {
            this.$refs.selectableTable.clearSelected()
        },
        onFiltered(filteredItems) {
            this.totalRows = filteredItems.length
            this.currentPage = 1
            this.rows=filteredItems.length
        },
        excelDownFunc(){
            var popup1=confirm("엑셀 파일로 다운로드하시겠습니까?");
            if(popup1){
                if(this.selected.length == 0){
                    const wb = XLSX.utils.book_new()                    // 엑셀 파일 생성 (workbook)
                    const ws = XLSX.utils.json_to_sheet(this.items)     // 시트 생성 (worksheet) 및 데이터 삽입
                    XLSX.utils.book_append_sheet(wb, ws, 'sheet1')      // 엑셀 파일에 시트 추가
                    XLSX.writeFile(wb, 'All_Excel.xlsx')                // 엑셀 다운로드
                }else{
                    const wb = XLSX.utils.book_new()
                    const ws = XLSX.utils.json_to_sheet(this.selected)
                    XLSX.utils.book_append_sheet(wb, ws, 'sheet1')
                    XLSX.writeFile(wb, 'Selected_Excel.xlsx')
                }
            }else{
                console.log("취소")
            }
        },
        removerow(){
            var popup = confirm("삭제하시겠습니까? ")
            var black = []
            if(popup){
                if(this.selected.length>0){
                    for(var i=0; i<this.selected.length; i++){
                        //console.log(this.selected[i]._id);
                        //선택된 row의 몽고DB ID는 this.selected[i]._id 로 이용할것
                        black.push(this.selected[i].LogDate);
                        axios.delete(`http://localhost:3000/api/deletelog/${this.selected[i].LogDate}`).then(()=>{
                        })
                    }
                }else{
                    alert("선택을 먼저 해주세요.")
                }
            }else{
                console.log("취소")
            }
            this.$router.go();
        },
        onContext(ctx) {
            this.context = ctx
        },
    },       // methods 끝
  }
</script>


<style>

@font-face {
    font-family: 'SLEIGothicTTF';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2104@1.0/SLEIGothicTTF.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'HallymGothic-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2204@1.0/HallymGothic-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
}

table.b-table thead th.w30{
    text-align: center;
    width: 210px;
    height: 30px;
}
table.b-table thead th.w40{
    text-align: center;
    width: 80px;
}
table.b-table thead th.w50{
    text-align: center;
    width: 50px;
}
table.b-table thead th.w60{
    text-align: center;
}

h1{
    font-family: HallymGothic-Regular;

}

b-button{
    font-size: 15px;
}

.btntag{
    border:1px solid black;
    border-radius: 20px;
    color:#000000;
    background-color: white;
    font-family: HallymGothic-Regular;
}


.font{
     font-size: 15px;
     font-family: HallymGothic-Regular;
     color : #000000;
     background-color: #ffffff00;
     font-weight: bold;
}

td {
    padding-top: 10px;
    padding-bottom: 10px;
}

</style>
