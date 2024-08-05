import { getHTML } from './browser_side-compiler.js';

const componentId = 'a7e4b880-82d5-4868-a71b-d7218a165d45';
export { componentId };




const data = {
    data() {
        return {
            count: 0,
        };
    },

    components: {
        
    },

    computed: {
        countReversed() {
            const array = new Array();
            for (let i = 0, l = this.count; i < l; ++i)
                array.push(i + 1);
            return array.reverse();
        },
    },

    provide() {
        return {
            
        }
    },

    methods: {
        computeType(n) {
            const count = this.count;
            if (n + 3 > count) {
                if ((count === n) || (count - 3 === n)) return 'windowed';
                else return 'roaded';
            }
            if (n <= 4) {
                return (n === 1 || n === 4) ? 'windowed' : 'roaded';
            }
            const cuttedN = n - 4;
            if (cuttedN % 5 === 0 || (cuttedN - 1) % 5 === 0) return 'windowed';
            if ((cuttedN + 2) % 5 === 0 || (cuttedN + 1) % 5 === 0) return 'roaded';
            return 'normal';
        },
    },

    created() {

    },

    mounted() {
        
    },

    watch: {
        count(value) {
            if (value < 8) this.count = 8;
        },
    },

    template: await getHTML(import.meta.url, componentId),

};


export default data;

