<template>
      <Toast />
  <header>
    <div class="card">
      <Menubar :model="items">
          <template #start>
              <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-2rem">
                  <path
                      d="M25.87 18.05L23.16 17.45L25.27 20.46V29.78L32.49 23.76V13.53L29.18 14.73L25.87 18.04V18.05ZM25.27 35.49L29.18 31.58V27.67L25.27 30.98V35.49ZM20.16 17.14H20.03H20.17H20.16ZM30.1 5.19L34.89 4.81L33.08 12.33L24.1 15.67L30.08 5.2L30.1 5.19ZM5.72 14.74L2.41 13.54V23.77L9.63 29.79V20.47L11.74 17.46L9.03 18.06L5.72 14.75V14.74ZM9.63 30.98L5.72 27.67V31.58L9.63 35.49V30.98ZM4.8 5.2L10.78 15.67L1.81 12.33L0 4.81L4.79 5.19L4.8 5.2ZM24.37 21.05V34.59L22.56 37.29L20.46 39.4H14.44L12.34 37.29L10.53 34.59V21.05L12.42 18.23L17.45 26.8L22.48 18.23L24.37 21.05ZM22.85 0L22.57 0.69L17.45 13.08L12.33 0.69L12.05 0H22.85Z"
                      fill="var(--primary-color)"
                  />
                  <path
                      d="M30.69 4.21L24.37 4.81L22.57 0.69L22.86 0H26.48L30.69 4.21ZM23.75 5.67L22.66 3.08L18.05 14.24V17.14H19.7H20.03H20.16H20.2L24.1 15.7L30.11 5.19L23.75 5.67ZM4.21002 4.21L10.53 4.81L12.33 0.69L12.05 0H8.43002L4.22002 4.21H4.21002ZM21.9 17.4L20.6 18.2H14.3L13 17.4L12.4 18.2L12.42 18.23L17.45 26.8L22.48 18.23L22.5 18.2L21.9 17.4ZM4.79002 5.19L10.8 15.7L14.7 17.14H14.74H15.2H16.85V14.24L12.24 3.09L11.15 5.68L4.79002 5.2V5.19Z"
                      fill="var(--text-color)"
                  />
              </svg>
          </template>
          <template #item="{ item, props, hasSubmenu, root }">
              <a :ripple="false" class="flex align-items-center" v-bind="props.action">
                  <span :class="item.icon" />
                  <span class="ml-2">{{ item.label }}</span>
                  <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
                  <span v-if="item.shortcut" class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{{ item.shortcut }}</span>
                  <i v-if="hasSubmenu" :class="['pi pi-angle-down', { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }]"></i>
              </a>
          </template>
          <template #end>
              <div class="flex align-items-center gap-2">
                  <InputText placeholder="Buscar..." type="text" class="w-8rem sm:w-auto" />
                  <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
              </div>
          </template>
      </Menubar>
  </div>
  </header>

  <div class="mt-4">

    <div class="card">
            <Toolbar class="mb-4">
                <template #start>
                    <Button label="Agregar" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
                    <Button label="Eliminar" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                </template>

                <template #end>
                    <Button label="Exportar" icon="pi pi-upload" severity="info" @click="exportCSV($event)"  />
                </template>
            </Toolbar>

            <DataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="id"
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                currentPageReportTemplate="Mostrando del {first} al {last} de {totalRecords} dispositivos">
                <template #header>
                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                        <h4 class="m-0">Dispositivos</h4>
						<IconField iconPosition="left">
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                        </IconField>
					</div>
                </template>
                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column field="marca" header="Marca" sortable style="min-width:12rem"></Column>
                <Column field="modelo" header="Modelo" sortable style="min-width:16rem"></Column>
                <Column field="imei" header="IMEI" sortable style="min-width:16rem"></Column>
                <Column field="numero_telefonico" header="Numero Telefónico" sortable style="min-width:16rem"></Column>
                <Column field="fecha_hora" header="Fecha/Hora" sortable style="min-width:16rem"></Column>

                <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="productDialog" :style="{width: '450px'}" header="Product Details" :modal="true" class="p-fluid">
            <div class="field">
                <label for="marca">Marca</label>
                <InputText id="marca" v-model.trim="product.marca" required="true" autofocus :invalid="submitted && !product.marca" maxlength="20"/>
                <small class="p-error" v-if="submitted && !product.marca">La marca es requerida.</small>
            </div>
            <div class="field">
                <label for="modelo">Modelo</label>
                <InputText id="modelo" v-model.trim="product.modelo" required="true" autofocus :invalid="submitted && !product.modelo" maxlength="20"/>
                <small class="p-error" v-if="submitted && !product.modelo">El modelo es requerido.</small>
            </div>
            <div class="field">
                <label for="imei">IMEI</label>
                <InputText id="imei" v-model.trim="product.imei" required="true" autofocus :invalid="submitted && !product.imei" maxlength="16"/>
                <small class="p-error" v-if="submitted && !product.imei">El IMEI es requerido.</small>
            </div>
            <div class="field">
                <label for="numero_telefonico">NUMERO TELEFÓNICO</label>
                <InputMask id="numero_telefonico" v-model="product.numero_telefonico" required="true" autofocus mask="(999) 999-9999" placeholder="(999) 999-9999" fluid :invalid="submitted && !product.numero_telefonico"/>
                <small class="p-error" v-if="submitted && !product.numero_telefonico">El número telefónico es requerido.</small>
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog"/>
                <Button label="Save" icon="pi pi-check" text @click="saveProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="product">Eliminar este dispositivo <b>{{product.name}}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false"/>
                <Button label="Yes" icon="pi pi-check" text @click="deleteProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="product">Eliminar los productos seleccionados?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false"/>
                <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
            </template>
        </Dialog>

  </div>
  
</template>

<script setup>
import InputText from 'primevue/inputtext';
import Badge from 'primevue/badge';
import Avatar from 'primevue/avatar';
import Menubar from 'primevue/menubar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import { ProductService } from '@/services/ProductService';
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Dialog from 'primevue/dialog';
import InputMask from 'primevue/inputmask';
import Toast from 'primevue/toast';

onMounted(() => {
    ProductService.getProducts().then((data) => (products.value = data));
});

const toast = useToast();
const dt = ref();
const products = ref();
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref();
const filters = ref({
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
});
const submitted = ref(false);

const formatCurrency = (value) => {
    if(value)
        return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    return;
};
const openNew = () => {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
};
const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};
const saveProduct = () => {
    submitted.value = true;

    if (product?.value.marca?.trim() && product?.value.modelo?.trim() && product?.value.imei?.trim() && product?.value.numero_telefonico?.trim()) {
        if (product.value.id) {
            products.value[findIndexById(product.value.id)] = product.value;
            toast.add({severity:'success', summary: 'Successful', detail: 'Dispositivo actualizado', life: 3000});
            console.log("actualizar")
        }
        else {
            console.log("crear")
            product.value.id = createId();
            product.value.fecha_hora =  obtenerFechaHora();
            products.value.push(product.value);
            toast.add({severity:'success', summary: 'Successful', detail: 'Dispositivo registrado', life: 3000});
        }

        product.value.marca = product.value.marca.toUpperCase();
        product.value.modelo = product.value.modelo.toUpperCase();
        productDialog.value = false;
        product.value = {};
    }
};
const editProduct = (prod) => {
    product.value = {...prod};
    productDialog.value = true;
};
const confirmDeleteProduct = (prod) => {
    product.value = prod;
    deleteProductDialog.value = true;
};
const deleteProduct = () => {
    products.value = products.value.filter(val => val.id !== product.value.id);
    deleteProductDialog.value = false;
    product.value = {};
    toast.add({severity:'success', summary: 'Successful', detail: 'Dispositivo eliminado', life: 3000});
};
const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.value.length; i++) {
        if (products.value[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
};
const createId = () => {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}
const exportCSV = () => {
    dt.value.exportCSV();
};
const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};
const deleteSelectedProducts = () => {
    products.value = products.value.filter(val => !selectedProducts.value.includes(val));
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
    toast.add({severity:'success', summary: 'Successful', detail: 'Dispositivo eliminado', life: 3000});
};
const items = ref([
    {
        label: 'Inicio',
        icon: 'pi pi-home'
    },
    {
        label: 'Almacén',
        icon: 'pi pi-search',
        items: [
            {
                label: 'Categorías',
                icon: 'pi pi-bolt'
            },
            {
                label: 'Inventario',
                icon: 'pi pi-server'
            },
            {
                label: 'Reportes',
                icon: 'pi pi-pencil'
            },
            {
                separator: true
            }
        ]
    },
    {
        label: 'Contacto',
        icon: 'pi pi-envelope',

    }
]);
const obtenerFechaHora = () =>{
    const date = new Date();          
          const formatear = ("0" + date.getDate()).slice(-2) + "-" + ("0"+(date.getMonth()+1)).slice(-2) + "-" +
                            date.getFullYear() + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":"
                            + ("0" + date.getSeconds()).slice(-2);   
          // Mostramos la fecha y hora en la consola                                   
          console.log(formatear); 
          
          return formatear;  
};
</script>

<style scoped>

</style>
