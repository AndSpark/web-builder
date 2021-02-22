<template>
	<v-sheet width="100%">
		<v-row v-for="(typeArr, type, index) in category" :key="index">
			<v-col cols="12" class="d-flex ">
				<p class="text-subtitle-1 black--text">依赖的{{ type }}文件链接</p>
				<v-spacer></v-spacer>
				<v-btn small @click="upload(type)" class="mr-2"><v-icon>mdi-cloud</v-icon> 上传</v-btn>
				<v-btn small @click="add(type)"><v-icon>mdi-plus</v-icon> 添加</v-btn>
			</v-col>

			<v-col
				cols="12"
				class="d-flex my-n5 align-center"
				v-for="(item, i) in typeArr"
				:key="item + i"
			>
				<v-checkbox class="text-h1" v-model="item.preload">
					<template v-slot:label>
						<v-subheader class="mx-n4">预加载</v-subheader>
					</template>
				</v-checkbox>
				<v-text-field label="stylesheet" class="mx-4" v-model="item.link"></v-text-field>
				<v-btn x-small fab elevation="2" @click="remove(type, i)"
					><v-icon>mdi-trash-can</v-icon>
				</v-btn>
			</v-col>
		</v-row>
	</v-sheet>
</template>

<script>
import { upload } from '@/tool/tool'

export default {
	name: 'RefList',
	components: {},
	props: {
		category: Object,
	},
	data() {
		return {
			categoryData: JSON.parse(JSON.stringify(this.category)),
		}
	},
	computed: {},
	methods: {
		add(type) {
			this.categoryData[type].push({
				link: '',
				preload: false,
			})
			this.$emit('update:category', this.categoryData)
		},
		remove(type, i) {
			this.categoryData[type].splice(i, 1)
			this.$emit('update:category', this.categoryData)
		},
		async upload(type) {
			try {
				let { url } = await upload()
				this.categoryData[type].push({
					link: url,
					preload: false,
				})
			} catch (error) {
				alert(error)
			}
		},
	},
}
</script>

<style lang="scss">
#RefList {
}
</style>
