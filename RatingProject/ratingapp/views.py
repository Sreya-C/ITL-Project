from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from .models import Sentence, SentenceForm

def index(request):
    sentences = Sentence.objects.all()
    return render(request, 'index.html', {'sentences': sentences})
#For table

def save_rating(request):
    if request.method == 'POST':
        sno = request.POST.get('sno')
        rating = request.POST.get('rating')
        # Update rating in the database
        sentence = Sentence.objects.get(sno=sno)
        sentence.rating = rating
        sentence.save()
        return HttpResponseRedirect('/')  # Redirect to the index page after saving rating
#for saving each rating

def sort_table(request):
    column = request.GET.get('column')
    order = request.GET.get('order')
    if column in ['SNO', 'SOURCE', 'TARGET', 'RATING'] and order in ['asc', 'desc']:
        if column == 'RATING':
            sentences = Sentence.objects.all().values
            print(sentences)
            sentences = sentences.order_by(('' if order == 'asc' else '-') + 'rating')
        else:
            sentences = Sentence.objects.all().order_by(('' if order == 'asc' else '-') + column.lower() + ('' if column in ['SOURCE', 'TARGET'] else '_asc'))
        return render(request, 'index.html', {'sentences': sentences})
    else:
        # Handle invalid sorting request
        return HttpResponseRedirect('/')

def add_sentence(request):
    form = SentenceForm()
    if request.method == 'POST':
        form = SentenceForm(request.POST)
        if form.is_valid():
            # Get the last loaded sentence
            last_sentence = Sentence.objects.last()
            sno = last_sentence.sno + 1 if last_sentence else 1  # Calculate sno for the new sentence
            form.instance.sno = sno  # Assign the calculated sno to the form instance
            form.save()  # Save the form
            return redirect('/')  # Redirect to the index page
    return render(request, 'add_sentence.html', {'form': form})