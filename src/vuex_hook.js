import { computed } from "vue";
import { mapActions, mapGetters, mapMutations, mapState, useStore } from 'vuex';
/**
 * 封装 vuex map函数的hooks写法 引用到组件中使用 ，传参与文档相同。
 * 
 */
function mapAll(module, keys, mapFn) {
    const $store = useStore();
    const stateFn = mapFn(module, keys);
    const res = {};
    const isMapData = [mapState, mapGetters].includes(mapFn);
    for (const key in stateFn) {
        if (Object.hasOwnProperty.call(stateFn, key)) {
            const fn = stateFn[key].bind({ $store });
            res[key] = isMapData ? computed(fn) : fn;
        } else {
            console.log(key,'key')
            console.log(keys,'keys')
        }
    }
    return res;
}

export function useMapState(module, keys) {
    return mapAll(module, keys, mapState)
}
export function useMapMutations(module, keys) {
    return mapAll(module, keys, mapMutations)
}
export function useMapActions(module, keys) {
    return mapAll(module, keys, mapActions)
}
export function useMapGetters(module, keys) {
    return mapAll(module, keys, mapGetters)
}