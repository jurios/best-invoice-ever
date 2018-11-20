import yaml from 'js-yaml';
import {
    PERSON
} from '../../invoice/data.yml';
import {
    terms
} from '../terms';

// Called by templates to decrease redundancy
function getVueOptions (name) {
    const opt = {
        name: name,
        data () {
            return {
                person: yaml.load(PERSON),
                terms: terms
            };
        },
        computed: {
            lang () {
                const defaultLang = this.terms.en;
                const useLang = this.terms[this.person.lang];

                // overwrite non-set fields with default lang
                Object.keys(defaultLang)
                  .filter(k => !useLang[k])
                  .forEach(k => {
                      console.log(k);
                      useLang[k] = defaultLang[k];
                  });

                return useLang;
            },

            totalWithoutTaxes () {
                let total = 0;
                this.person.items.forEach((item) => {
                    total += item.price * item.quantity;
                });

                return total;
            },

            totalWithTaxes() {
                let total = this.totalWithoutTaxes;

                this.person.taxes.forEach((tax) => {
                    total += this.taxResult(tax);
                });

                return total;
            }
        },

        methods: {
            computedPrice (item) {
                return item.quantity * item.price;
            },

            taxResult(tax) {
                if (tax.type === '%') {
                    return Math.round(this.totalWithoutTaxes * (tax.value / 100));
                }

                return tax.value;
            }

        }
    };
    return opt;
}

export {
    getVueOptions
};
