<template>
  <div class="log">

    <h1>로그 테이블</h1><br>
        Selected : {{ selected.length }}
    <p>
      <b-button @click="selectAllRows">전체 선택</b-button>
      <b-button @click="clearSelected">전체 해제</b-button>
      <b-button @click="removerow">삭제</b-button>
    </p>

    <date-picker
        v-model="filter"
        range
        placeholder="날짜 입력"
    >
    </date-picker>


    <div style="display: flex; float:left; margin-left:48px; ">
        <b-form-input style="width:150px; height:50px" v-model="startDate" type="date"/>
        <b-form-input style="width:150px; height:50px" v-model="endDate" type="date"/>
    </div>
    <br/><br/><br/>


    <b-button
        style="font-size:20px;
               float:right;
               margin-right:48px;
               margin-bottom:5px;"
        @click="excelDownFunc">
        Excel Download
    </b-button>

    <div style="display: flex; float:left; margin-left:48px; ">
        <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
        </b-input-group>
    </div>

    <b-table
        id="my_table"
        class="m-5"
        bordered hover striped small
        :items="items"
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

    <div>
        <div style="font-size: 25px;  display: flex; justify-content: center;">
            <p>
            Per Page :
                <b-form-select
                    style="margin-right:10px;"
                    id="per-page-select"
                    v-model="perPage"
                    :options="pageOptions"
                />
            </p>

            <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="my-table"
                size="lg"
            >
            </b-pagination>

        </div>
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


Vue.use(VueAxios, axios)


var startDate = new Date("2022-08-04");
var endDate = new Date("2022-08-06");

var resultProductData = item.filter(a => {
  var date = new Date(a.LogDate.slice(0,11));
  //console.log(date.toLocaleDateString());
  return (date >= startDate && date <= endDate);
});
console.log(resultProductData)


export default {
    name : 'Logs',
    components: { DatePicker },

    data() {
        return {
            startDate:null,
            endDate:null,
            filter : null,

            fields : [
                {key : 'LogDate', label:'날짜' },
                {key : 'LogLevel', label:'레벨'},
                {key : 'LogCode', label:'코드'},
                {key : 'LogString', label:'내용'},
            ],
            items: item,
            sortBy: 'LogDate',
            sortDesc: true,
            currentPage: 1,
            rows:item.length,
            perPage: 10,
            selectMode: 'multi',
            filterOn: [],
            selected: [],
            pageOptions: [5, 10, 15, 20 ,{ value: item.length, text: "All" }]
        }
    },      // date 끝
    methods: {
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
        },
        excelDownFunc(){
            var popup1=confirm("엑셀 파일로 다운로드하시겠습니까?");
            if(popup1){
                if(this.selected.length == 0){
                    const wb = XLSX.utils.book_new()                    // 엑셀 파일 생성 (workbook)
                    const ws = XLSX.utils.json_to_sheet(this.items)     // 시트 생성 (worksheet) 및 데이터 삽입
                    XLSX.utils.book_append_sheet(wb, ws, 'sheet1')      // 엑셀 파일에 시트 추가
                    XLSX.writeFile(wb, 'All_Excel.xlsx')                   // 엑셀 다운로드
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
                console.log(black)
                }else{
                    alert("선택을 먼저 해주세요.")
                }
            }else{
                console.log("취소")
            }

        },
    },       // methods 끝

  }
</script>


<style>

</style>
