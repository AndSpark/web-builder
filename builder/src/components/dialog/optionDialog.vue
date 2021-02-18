<template>
	<div id="optionDialog">
		<v-snackbar v-model="isSuccess" centered :timeout="3000"
			><v-icon color="success">mdi-check</v-icon> 保存成功！</v-snackbar
		>
		<v-dialog v-model="optionDialogStatus" persistent max-width="600px">
			<v-card>
				<v-toolbar flat color="primary" dark>
					<v-icon class="text-h4 mr-3">mdi-tune</v-icon>
					<span class="headline">修改配置</span>
				</v-toolbar>
				<v-card-text class="pt-2">
					<v-row>
						<v-col cols="4">
							<v-text-field label="html文件名" v-model="options.htmlName"></v-text-field>
						</v-col>
						<v-col cols="4">
							<v-text-field label="css文件名" v-model="options.cssName"></v-text-field>
						</v-col>
						<v-col cols="4">
							<v-text-field label="js文件名" v-model="options.jsName"></v-text-field>
						</v-col>

						<v-col cols="12" class="d-flex ">
							<p class="text-subtitle-1 black--text">引用的style文件链接</p>
							<v-spacer></v-spacer>
							<v-btn small @click="addStyle"><v-icon>mdi-plus</v-icon> 添加</v-btn>
						</v-col>
						<!-- style列表 -->
						<v-col
							cols="12"
							class="d-flex my-n5 align-center"
							v-for="(style, i) in options.styles"
							:key="'style' + i"
						>
							<v-checkbox class="text-h1" v-model="style.preload">
								<template v-slot:label>
									<v-subheader class="mx-n4">预加载</v-subheader>
								</template>
							</v-checkbox>
							<v-text-field label="stylesheet" class="mx-4" v-model="style.link"></v-text-field>
							<v-btn x-small fab @click="deleteStyle(i)"><v-icon>mdi-trash-can</v-icon> </v-btn>
						</v-col>

						<v-col cols="12" class="d-flex ">
							<p class="text-subtitle-1 black--text ">引用的script文件链接</p>
							<v-spacer></v-spacer>
							<v-btn small @click="addScript"><v-icon>mdi-plus</v-icon> 添加</v-btn>
						</v-col>
						<!-- script 列表 -->
						<v-col
							cols="12"
							class="d-flex my-n5 align-center"
							v-for="(script, i) in options.scripts"
							:key="'script' + i"
						>
							<v-checkbox class="text-h1" v-model="script.preload">
								<template v-slot:label>
									<v-subheader class="mx-n4">预加载</v-subheader>
								</template>
							</v-checkbox>
							<v-text-field label="script" class="mx-4" v-model="script.link"></v-text-field>
							<v-btn x-small fab @click="deleteScript(i)"><v-icon>mdi-trash-can</v-icon> </v-btn>
						</v-col>
					</v-row>
					<v-row class="mt-5 mb-0 mr-1">
						<v-spacer></v-spacer>
						<v-btn color="blue darken-1" text @click="cancerOptions" class="mr-2">取消</v-btn>
						<v-btn color="blue darken-1" text @click="saveOptions">保存</v-btn>
					</v-row>
				</v-card-text>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
export default {
	name: 'optionDialog',
	components: {},
	props: {
		optionDialogStatus: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			options: {
				htmlName: 'index.html',
				cssName: 'common.css',
				jsName: 'bundle.js',
				styles: [],
				scripts: [],
			},
			isSuccess: false,
		}
	},
	computed: {},
	mounted() {
		let optionsJSON = localStorage.getItem('options')
		if (!optionsJSON) {
			optionsJSON = JSON.stringify(this.options)
			localStorage.setItem('options', optionsJSON)
		}
		this.options = JSON.parse(optionsJSON)
	},
	methods: {
		addStyle() {
			this.options.styles.push({
				link: '',
				preload: false,
			})
		},
		deleteStyle(i) {
			this.options.styles.splice(i, 1)
		},
		addScript() {
			this.options.scripts.push({
				link: '',
				preload: false,
			})
		},
		deleteScript(i) {
			this.options.scripts.splice(i, 1)
		},
		saveOptions() {
			let optionsJSON = JSON.stringify(this.options)
			localStorage.setItem('options', optionsJSON)
			this.$emit('update:optionDialogStatus', false)
			this.isSuccess = true
		},
		cancerOptions() {
			let optionsJSON = localStorage.getItem('options')
			this.options = JSON.parse(optionsJSON)
			this.$emit('update:optionDialogStatus', false)
		},
	},
}
</script>

<style lang="scss">
#optionDialog {
}
</style>
