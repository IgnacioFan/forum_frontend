<template>
  <div 
    v-show="!isLoading"
    class="container py-5"
  >
    <AdminNav />

    <form class="my-4">
      <div class="form-row">
        <div class="col-auto">
          <input
            type="text"
            v-model="newCategoryName"
            class="form-control"
            placeholder="add new category..."
          >
        </div>
        <div class="col-auto">
          <button
            type="button"
            class="btn btn-primary"
            :disabled="isProcessing"
            @click.stop.prevent="createCategory"
          >
            Create
          </button>
        </div>
      </div>
    </form>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th
            scope="col"
            width="60"
          >
            #
          </th>
          <th scope="col">
            Category Name
          </th>
          <th
            scope="col"
            width="210"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="category in categories"
          :key="category.id"
        >
          <th scope="row">
            {{ category.id }}
          </th>
          <td class="position-relative">
              <div 
                v-show="!category.isEditing"
                class="category-name"
              >
                {{ category.name }}
              </div>
              <input
                v-show="category.isEditing"
                v-model="category.name"
                type="text"
                class="form-control"
              >
              <span
                v-show="category.isEditing"
                class="cancel"
                @click.stop.prevent="handleCancel(category.id)"
              >X</span>
          </td>
          <td class="d-flex justify-content-between">
            <button
              v-show="!category.isEditing"
              type="button"
              class="btn btn-link mr-2"
              @click.stop.prevent="toggleIsEditing(category.id)"
            >
              Edit
            </button>
            <button
              v-show="category.isEditing"
              type="button"
              class="btn btn-link mr-2"
              @click.stop.prevent="updateCategory({ categoryId: category.id, name: category.name })"
            >
              Save
            </button>
            <button
              type="button"
              class="btn btn-link mr-2"
              @click.stop.prevent="removeCategory(category.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
/* eslint-disable */
import adminAPI from '../apis/admin';
import { Toast, validateForm } from '../utils/helpers';
import AdminNav from '../components/AdminNav';
import uuid from 'uuid/v4';

export default {
  components: {
    AdminNav
  },
  data () {
    return {
      categories: [],
      newCategoryName: '',
      isLoading: true,
      isProcessing: false
    }
  },
  created () {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories () {
      try {
        const { data } = await adminAPI.categories.get();
        this.categories = data.categories.map(category => ({
          ...category,
          isEditing: false,
          nameCache: ''
        })); 
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
        Toast.fire({
          icon: 'error',
          title: 'Cannot fetch categories, please try it later!'
        })
      }
    },
    async createCategory() {
      try {
        if(!this.newCategoryName) return validateForm('without category name!');
        this.isProcessing = true;
        const { data } = await adminAPI.categories.create({name: this.newCategoryName});
        if(data.status !== 'success') throw new Error(data.message);
        this.categories.push({
          id: data.categoryId,
          name: this.newCategoryName
        })
        this.isProcessing = false;
        this.newCategoryName = '';
      } catch (error) {
        console.log(error);
        this.isProcessing = false;
        Toast.fire({
          icon: 'error',
          title: 'Cannot add new category, please try it later!'
        })
      }
    },
    async removeCategory(categoryId) {
      try {
        const { data } = await adminAPI.categories.delete({categoryId});
        if(data.status !== 'success') throw new Error(data.message);
        this.categories = this.categories.filter(
          category => category.id !== categoryId
        );
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: 'error',
          title: 'Cannot add new category, please try it later!'
        })
      }
    },
    toggleIsEditing(categoryId) {
      this.categories = this.categories.map(category => {
        if(category.id === categoryId) {
          return {
            ...category,
            isEditing: !category.isEditing,
            nameCache: category.name
          }
        }
        return category
      });
    },
    async updateCategory({categoryId, name}) {
      try {
        const { data } = await adminAPI.categories.update({categoryId, name});
        if(data.status !== 'success') throw new Error(data.message);
        console.log(data);
        this.toggleIsEditing(categoryId);
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: 'error',
          title: 'Cannot edit this category, please try it later!'
        })
      }
    },
    handleCancel(categoryId){
      this.categories = this.categories.map(category => {
        if(category.id === categoryId) {
          return {
            ...category,
            name: category.nameCache
          }
        }
        return category
      });
      this.toggleIsEditing(categoryId);
    }
  }
}
</script>
<style scoped>
.category-name {
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  outline: 0;
  cursor: auto;
}

.btn-link {
  width: 62px;
}

.cancel {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: 1px solid #aaaaaa;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  font-size: 12px;
}
</style>
