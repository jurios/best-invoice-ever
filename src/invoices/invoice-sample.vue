<template>
  <div class="resume">
    <div class="banner">
      <div class="banner__fullname">{{ lang.invoice }}</div>
      <div class="banner__reference">#{{ person.reference}}</div>
    </div>

    <div class="content content__references">
      <div class="content__left">
        <div class="section">
          <div class="section-headline">
            <i class="section-headline__icon fa fa-user"></i> {{ lang.contact}}
          </div>
        </div>

        <div class="content">
          <div class="section-content">
            <span class="section-content__header"><b>{{ lang.full_name }}:</b> {{ person.contact.full_name }}</span>
            <span class="section-content__header"><b>{{ lang.address }}:</b> {{ person.contact.address }}</span>
            <span class="section-content__header"><b>{{ lang.town }}:</b> {{ person.contact.town }}
              <span class="province">
                <b>{{ lang.province }}:</b> {{ person.contact.province}}
              </span>
            </span>
            <span class="section-content__header"><b>{{ lang.dni }}:</b> {{ person.contact.dni }}</span>
          </div>
        </div>
      </div>

      <div class="content__right">
        <div class="section">
          <div class="section-headline">
            <i class="section-headline__icon material-icons">work</i> {{ lang.client}}
          </div>

          <div class="section-content">
            <span class="section-content__header"><b>{{ lang.full_name }}:</b> {{ person.client.full_name }}</span>
            <span class="section-content__header"><b>{{ lang.address }}:</b> {{ person.client.address }}</span>
            <span class="section-content__header"><b>{{ lang.town }}:</b> {{ person.client.town }}
              <span class="province">
                <b>{{ lang.province }}:</b> {{ person.client.province}}
              </span>
            </span>
            <span class="section-content__header"><b>{{ lang.dni }}:</b> {{ person.client.dni }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="content content__summary">
      <div class="section card summary">
        <div class="section-headline">
          <i class="section-headline__icon fa fa-list"></i> Resumen
        </div>

        <div class="section-content">
          <span class="section-content__header"><b>{{ lang.full_name }}:</b> {{ person.client.full_name }}</span>
          <span class="section-content__header"><b>{{ lang.date }}:</b> {{ person.date }}</span>
          <span class="section-content__header"><b>{{ lang.subject }}:</b> {{ person.subject }} </span>
          <span class="summary-total">{{ this.totalWithTaxes }} €</span>
        </div>
      </div>
    </div>

    <div class="content content__subject">
      <div class="section card subject">
        <div class="section-content">
          <table class="table">
            <thead>
              <tr>
                <td> {{ lang.subject }} </td>
                <td> {{ lang.quantity }} </td>
                <td> {{ lang.price }} </td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in person.items">
                <td>{{ item.item }}</td>
                <td class="text-center"> {{ item.quantity}} </td>
                <td class="text-center"> {{ computedPrice(item)}} €</td>
              </tr>
              <tr v-for="tax in person.taxes">
                <td></td>
                <td>{{ tax.tax }} ( {{ Math.abs(tax.value) }}
                  <span v-if="tax.type === '%'">%</span>
                  )
                </td>
                <td class="text-center"> {{ taxResult(tax) }} €</td>
              </tr>
              <tr class="total">
                <td>TOTAL</td>
                <td></td>
                <td class="text-center">{{ this.totalWithTaxes }} €</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="content content__footer">
      <div class="section">
        <div class="section-content">
          <h1>{{ lang.bye}}</h1>
        </div>
      </div>
    </div>

    <div class="picture"></div>
  </div>
</template>

<script>
import Vue from 'vue';
import { getVueOptions } from './options';

const name = 'invoice-sample'; // TODO change name
export default Vue.component(name, getVueOptions(name));
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@accent-color: #34495E;
@banner-color: #42b883;
@banner-height: 75px;
@picture-size: 120px;
@picture-offset: 35px;
@base-padding: 30px;
@left-column-width: 330px;
a {
  color: inherit;
  cursor: pointer;
  text-decoration-line: none;
  &:visited {
    color: inherit;
  }
}
.resume {
  position: relative;
  font-family:'Roboto' !important;
  font-size: 0.9em;
}
.picture {
  position: absolute;
  top: @banner-height - @picture-offset;
  left: @left-column-width + @base-padding * 2 - @picture-size / 2;
  height: @picture-size;
  width: @picture-size;
  border-radius: 50%;
  border: 5px solid @accent-color;
  content: url('../../invoice/id.jpg');
  background-color: #da5454;
  z-index: 2;
  box-shadow: 0px 0px 20px -5px;
}

.banner {
  width: calc(100% - @base-padding * 2);
  height: @banner-height;
  padding: @base-padding;
  background-color: @banner-color;
  /*
    background-image: url('../../resume/banner.png');
    background-repeat: no-repeat;
    background-size: cover;
  */
  color: white;
  &__fullname {
    font-size: 32px;
    float: left;
  }
  &__position {
    font-size: 16px;
  }
  &__location {
    font-size: 12px;
  }

  &__reference {
    float: right;
    font-size: 25px;
  }
}
.content {
  display: flex;
  width: 100%;
  height: 100%;
  &__references {
    height: 12%;
  }

  &__summary {
    height: 200px;
  }

  &__left,
  &__right {
    height: 100%;
    padding: @base-padding;
  }
  &__left {
    width: @left-column-width;
    color: rgba(255, 255, 255, 0.59);
    background-color: @accent-color;
    .section-headline {
      color: white;
    }
  }
  &__right {
    flex: 1;
  }

  &__subject {
    height: auto;

    .section-content {
      padding-left: 0px;
    }

    table tbody td {
      padding: 10px;
    }

    table tbody tr:nth-of-type(odd) {
      background-color: rgba(0,0,0,.05);
    }

    table tr.total {
      background-color: @banner-color;
    }
  }

  &__footer {
    background-color: @banner-color;
    position: absolute;
    bottom: 0px;
    height: 7%;
    color: white;

    h1 {
      margin: 0px;
    }
  }
}
.section {
  margin: 20px 0;
}
.section-link,
.section-headline {
  display: flex !important;
  align-items: center;
  color: @accent-color;
  display: inline-block;
  font-size: 1.2em;
  margin: 8px 0;
  &__icon {
    margin-right: 8px;
    font-size: 1.4em;
  }
}
.section-link {
  font-size: 1.1em;
  color: rgba(255, 255, 255, 0.59) !important;
  &__icon {
    color: white;
  }
}
.section-content {
  margin-top: 5px;
  padding-left: 32px;
  font-size: 14px;
  &__item {
    display: block;
    margin-bottom: 5px;
  }
  &__header {
    display: block;
    font-size: 1.1em;
    font-weight: 500;
  }
  &__subheader {
    display: block;
    font-weight: 400;
  }
  &__plain,
  &__text {
    display: block;
    font-size: 12px;
    &--light {
      font-size: 12px;
    }
  }
  &__plain {
    display: inline;
    font-weight: 300;
  }
  &__item-grid {
    flex: 1 1 0;
    margin-bottom: 5px;
    padding-right: 5px;
  }
  &--plain {
    padding: 0;
  }
}
.section-content-grid {
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
  margin-bottom: 5px;
}
.grid-item {
  padding-right: 5px;
}
.squarred-grid-item {
  display: block;
  border: 1px solid white;
  color: white;
  margin-top: 5px;
  padding: 5px;
}

.section-headline {
  text-transform:uppercase;
  font-weight:500;
  letter-spacing:3px;
  font-size:10pt;
  opacity:0.8;
  margin-left:20px;
  margin-top:40px;
  margin-bottom:20px;
  color:#3f3d3c;
}

.section.card {
  margin-top: 100px;
  width: 80%;
  margin-left: 50px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  height: 170px;

  .section-headline {
    margin-top: 0px;
    padding: 20px;
    background-color: whitesmoke;
    margin-left: 0px;
  }

  .summary-total {
    float: right;
    font-size: 20px;
    font-weight: 900;
    padding: 0px 20px 0px 20px;
  }
}

.section.card.subject {
  height: auto;
}
.section.card.subject table {
  width: 100%;

  thead tr td {
    background-color: whitesmoke;
    padding: 10px 20px;
    text-align: center;
  }
}

.province {
  margin-left: 10px;
}

.text-center {
  text-align: center;
}


</style>
