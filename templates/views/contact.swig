{% extends "../layouts/default.swig" %}


{% block title %}QET America | Contact {% endblock %}

{% block content %}
	<div id="contact" class="card">
		<div class="titlebar">
			<h1>{{ t('Contact QET') }}</h1>
		</div>
		{% if enquirySubmitted %}
			<div class="thanks">
				<h3>Thanks for getting in touch.</h3>
			</div>
		{% else %}
			<div class="row">
				<div class="col-sm-8 col-md-6">
					<form method="post">
						<input type="hidden" name="action" value="contact">
						{% set className = "" %}
						{% if validationErrors.name %}
							{% set className = "has-error" %}
						{% endif %}
						<div class="form-group {{ className }}">
							<label>
								<span>{{ t('Name') }}</span>
								<input type="text" name="name.full" value="{{ formData['name.full'] | default('') }}" class="form-control">
							</label>
						</div>
						{% set className = "" %}
						{% if validationErrors.email %}
							{% set className = "has-error" %}
						{% endif %}
						<div class="form-group {{ className }}">
							<label>
								<span>{{ t('Email') }}</span>
								<input type="email" name="email" value="{{ formData.email | default('') }}" class="form-control">
							</label>
						</div>
						<div class="form-group">
							<label>
								<span>{{ t('Phone') }}</span>
								<input type="text" name="phone" value="{{ formData.phone | default('') }}" placeholder="{{ t('(optional)') }}" class="form-control">
							</label>
						</div>
						{% set className = "" %}
						{% if validationErrors.enquiryType %}
							{% set className = "has-error" %}
						{% endif %}
						<div class="form-group {{ className }}">
							<label>
								<span>{{ t('What are you contacting us about?') }}</span>
								<select name="enquiryType" class="form-control">
									<option value="">{{ t('(select one)') }}</option>
									{% for type in enquiryTypes %}
										{% set selected = "" %}
										{% if formData.enquiryType === type.value %}
											{% set selected = " selected" %}
										{% endif %}
										<option value="{{ type.value }}"{{ selected }}>{{ t(type.label) }}</option>
									{% endfor %}
								</select>
						</div>
						{% set className = "" %}
						{% if validationErrors.message %}
							{% set className = "has-error" %}
						{% endif %}
						<div class="form-group {{ className }}">
							<label>
								<span>{{ t('Message') }}</span>
								<textarea name="message" placeholder="{{ t('Leave us a message') }}..." rows="4" class="form-control">
									{{ formData.message }}
								</textarea>
							</label>
						</div>
						<div class="form-actions">
							<button type="submit" class="button">Send</button>
						</div>
					</form>
				</div>
			</div>
		{% endif %}
	</div>
{% endblock %}
